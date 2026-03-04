const axios = require('axios');

class AiServiceAdapter {
    constructor() {
        this.apiUrl = 'http://ai-service:8000';
    }

    async generateResponse(prompt) {
        try {
            const response = await axios.post(`${this.apiUrl}/chat`, { message: prompt });
            return response.data.answer;
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}

module.exports = AiServiceAdapter;