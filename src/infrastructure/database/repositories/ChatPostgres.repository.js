// Importamos la interfaz para cumplir con el contrato del dominio
const ChatRepositoryInterface = require('../../../domain/repositories/ChatRepository.interface.js');
// Importamos el modelo de Sequelize
const { Chat: ChatModel } = require('../models');
// Opcional: Si quieres transformar los datos antes de devolverlos
// const ChatMapper = require('../mappers/Chat.mapper.js');

class ChatPostgresRepository extends ChatRepositoryInterface {
    
    async saveChat(prompt, response) {
        try {
            // Creamos el registro en la base de datos
            const createdChat = await ChatModel.create({ 
                prompt, 
                response 
            });

            // En arquitectura hexagonal pura, aquí devolverías la entidad
            // usando un mapper, pero para tu ejercicio de prueba, 
            // devolver el objeto de Sequelize es suficiente.
            return createdChat; 
        } catch (error) {
            console.error('Error saving chat in Postgres:', error);
            throw new Error('Database Error: No se pudo guardar la conversación');
        }
    }

    // Un método extra que te servirá para que Postman vea el historial
    async findAll() {
        try {
            return await ChatModel.findAll({
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error('Error recuperando el historial');
        }
    }
}

module.exports = ChatPostgresRepository;