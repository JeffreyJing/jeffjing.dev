import json
import os
import numpy as np
import requests

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

# Load precomputed embeddings
with open("data.jsonl", "r") as f:
    docs = [json.loads(line) for line in f]
    texts = [d["text"] for d in docs]
    vectors = [d["embedding"] for d in docs]

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def get_top_k(query_vec, k=3):
    sims = [cosine_similarity(query_vec, vec) for vec in vectors]
    top_indices = np.argsort(sims)[-k:][::-1]
    return [texts[i] for i in top_indices]

def handler(event, context):
    try:
        body = json.loads(event["body"])
        question = body.get("question", "")

        # Manually hit OpenAI embedding endpoint
        embed_resp = requests.post(
            "https://api.openai.com/v1/embeddings",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            json={"input": question, "model": "text-embedding-ada-002"}
        )
        embed_resp.raise_for_status()
        query_vec = embed_resp.json()["data"][0]["embedding"]

        context_chunks = get_top_k(np.array(query_vec))
        prompt = (
            "Use the following context to answer the question:\n\n"
            + "\n\n".join(context_chunks)
            + f"\n\nQuestion: {question}"
        )

        # Call Chat API manually
        chat_resp = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}]
            }
        )
        chat_resp.raise_for_status()
        answer = chat_resp.json()["choices"][0]["message"]["content"]

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            "body": json.dumps({"answer": answer})
        }

    except Exception as e:
        print("LAMBDA ERROR:", str(e))
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            "body": json.dumps({"error": str(e)})
        }
