const express = require ('express');
const AiServiceAdapter = require('./src/infrastructure/adapters/AiServiceAdapter.js');

const app = express();
const aiService = new AiServiceAdapter();

app.use(express.json());

app.post('/api/chat', async (req, res)=> {
 try {
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Debes enviar un "prompt" en el cuerpo' });
}

  console.log(`Recibido: ${prompt}`);

  const response = await aiService.generateResponse(prompt);

  res.json({
    success: true,
    ai_response: response
});

 } catch (error) {
  console.error('❌ Error en el flujo:', error.message);
  res.status(500).json({ 
      error: 'Hubo un problema conectando con el servicio de IA',
      details: error.message 
  });
 }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor con Express listo en http://localhost:${PORT}`);
});

