class SendChatUseCase {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
        this.aiServiceAdapter = aiServiceAdapter;
    }

    async execute(prompt) {
        try {
            const response = await this.aiServiceAdapter.generateResponse(prompt);
            await this.chatRepository.saveChat(prompt, response);
            return response;
        } catch (error) {
            console.error('Error sending chat:', error);
            throw error;
        }
    }
}

module.exports = SendChatUseCase;