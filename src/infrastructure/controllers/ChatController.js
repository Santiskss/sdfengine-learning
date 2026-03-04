const AiServiceAdapter = require('../adapters/AiServiceAdapter');
const SendChatUseCase = require('../../application/useCases/SendChatUseCase');
const ChatPostgresRepository = require('../database/repositories/ChatPostgres.repository');

const chatRepository = new ChatPostgresRepository();
const sendChatUseCase = new SendChatUseCase(chatRepository);

const chatController = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await sendChatUseCase.execute(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}