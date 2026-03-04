import os
from google.genai import Client
from fastapi import HTTPException

class GeminiProvider:
    def __init__(self):
        # 1. Inicializamos el cliente. 
        # Si no usas VertexAI (Google Cloud), no necesitas project ni location.
        # El '.aio' al final es lo que permite que sea ASÍNCRONO.
        self.aclient = Client(api_key=os.getenv("GOOGLE_API_KEY")).aio
        self.model_id = "gemini-2.5-flash"

    async def generate_response(self, prompt: str):
        try:
            # 2. Ahora sí, el await funciona porque 'aclient' es asíncrono
            response = await self.aclient.models.generate_content(
                model=self.model_id,
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"🔴 Error en la llamada a Gemini: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))