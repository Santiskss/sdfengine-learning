const {GoogleGenerativeAI} = require ("@google/generative-ai");

class AiServiceAdapter {
    constructor() {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY no está definido en las variables de entorno");
        }
    

        this.client = new GoogleGenerativeAI(apiKey);

        this.model = this.client.getGenerativeModel({
            model: "gemini-2.5-flash",
        });
    }

    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const text = result.response.text();
            return text;
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}

module.exports = AiServiceAdapter;