import json
import boto3
import openai
import os
import sys
sys.modules["datalib"] = True


openai.api_key = os.environ.get("OPENAI_API_KEY")

# Load and parse text chunks and raw embeddings only (no NumPy yet)
with open("data.jsonl", "r") as f:
    docs = [json.loads(line) for line in f]
    texts = [d["text"] for d in docs]
    raw_vectors = [d["embedding"] for d in docs]  # still plain lists

def cosine_similarity(a, b):
    import numpy as np
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def get_top_k(query_vec, k=3):
    import numpy as np
    vectors = np.array(raw_vectors)
    sims = [cosine_similarity(query_vec, vec) for vec in vectors]
    top_indices = np.argsort(sims)[-k:][::-1]
    return [texts[i] for i in top_indices]

def handler(event, context):
    try:
        body = json.loads(event["body"])
        question = body["question"]

        query_embed = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=question
        )["data"][0]["embedding"]

        import numpy as np
        context_chunks = get_top_k(np.array(query_embed))
        prompt = (
            "Use the following context to answer the question:\n\n"
            + "\n\n".join(context_chunks)
            + f"\n\nQuestion: {question}"
        )

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"answer": response["choices"][0]["message"]["content"]})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }