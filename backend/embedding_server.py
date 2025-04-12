from fastapi import FastAPI, Request
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import uvicorn

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')

class EmbeddingRequest(BaseModel):
    text: str

@app.post("/embed")
async def embed_text(data: EmbeddingRequest):
    embedding = model.encode(data.text).tolist()
    return {"embedding": embedding}

if __name__ == "__main__":
    uvicorn.run("embedding_server:app", host="127.0.0.1", port=8000)
