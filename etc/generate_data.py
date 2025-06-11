# generate_data.py
import openai
import json
import os


client = openai.OpenAI(api_key="key_was_here")
def embed_texts(texts):
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=texts
    )
    return [d.embedding for d in response.data]

def process_file(filename):
    with open(filename, "r") as f:
        raw = f.read()

    chunks = [c.strip() for c in raw.split("\n\n") if c.strip()]
    embeddings = embed_texts(chunks)
    return [{"text": text, "embedding": emb} for text, emb in zip(chunks, embeddings)]

all_data = []

current_working_directory = os.getcwd()
print(current_working_directory)

for path in ["copies/data/resume.txt", "copies/data/projects.txt", "copies/data/skills.txt"]:
    all_data.extend(process_file(path))

with open("data.jsonl", "w") as out:
    for item in all_data:
        json.dump(item, out)
        out.write("\n")
