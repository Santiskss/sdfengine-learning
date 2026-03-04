from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from providers.gemini import GeminiProvider

app = FastAPI(title="AI Service", description="API for AI services")

gemini_client = GeminiProvider()

class ChatRequest(BaseModel):
    message: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    answer = await gemini_client.generate_response(request.message)
    return {"answer": answer}
    