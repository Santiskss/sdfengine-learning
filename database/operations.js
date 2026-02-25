const models = require('../models');
const databaseOperations = {
    async createUser(user) {
        try {
            const newUser = await models.User.create(user);
            return newUser;
        } catch (error) {
            throw new Error('Error al crear el usuario');
            }
        },

    async getUser(id) {
        try {
            const user = await models.User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    },

    async updateUser(id, user) {
        try {
            const updatedUser = await models.User.update(user, { where: { id } });
            return updatedUser;
        } catch (error) {
            throw new Error('Error al actualizar el usuario');
        }
    },
    
    async deleteUser(id) {
        try {
            await models.User.destroy({ where: { id } });
            return true;
        } catch (error) {
            throw new Error('Error al eliminar el usuario');
        }
    },

    async createProject(project) {
        try {
            const newProject = await models.Project.create(project);
            return newProject;
        } catch (error) {
            throw new Error('Error al crear el proyecto');
        }
    },

    async getProject(id) {
        try {
            const project = await models.Project.findByPk(id);
            return project;
        } catch (error) {
            throw new Error('Error al obtener el proyecto');
        }
    },

    async updateProject(id, project) {
        try {
            const updatedProject = await models.Project.update(project, { where: { id } });
            return updatedProject;
        } catch (error) {
            throw new Error('Error al actualizar el proyecto');
        }
    },
    
    async deleteProject(id) {
        try {
            await models.Project.destroy({ where: { id } });
            return true;
        } catch (error) {
            throw new Error('Error al eliminar el proyecto');
        }
    }
    
};

