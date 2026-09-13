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

def get_top_k(query_vec, k=5):
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
            json={"input": question, "model": "text-embedding-3-small"}
        )
        embed_resp.raise_for_status()
        query_vec = embed_resp.json()["data"][0]["embedding"]

        context_chunks = get_top_k(np.array(query_vec))
        prompt = (
            "Context about Jeffrey Jing:\n\n"
            + "\n\n".join(context_chunks)
            + f"\n\nQuestion: {question}"
        )

        system_prompt = (
            "You are the assistant embedded on Jeffrey Jing's personal portfolio site, "
            "speaking with recruiters and visitors. You only answer questions about "
            "Jeffrey Jing - his work experience, skills, projects, and background - "
            "using the provided context. You are not a general-purpose assistant: if "
            "someone asks something unrelated to Jeffrey (general tech questions, "
            "unrelated trivia, etc.), politely decline and steer the conversation back "
            "to what they'd like to know about Jeffrey. If it's just a greeting, "
            "respond briefly and warmly, then invite them to ask about Jeffrey's "
            "experience, skills, or background."
        )

        # Call Chat API manually
        chat_resp = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt},
                ]
            }
        )
        chat_resp.raise_for_status()
        answer = chat_resp.json()["choices"][0]["message"]["content"]

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://jeffjing.dev",
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
                "Access-Control-Allow-Origin": "https://jeffjing.dev",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            "body": json.dumps({"error": str(e)})
        }
