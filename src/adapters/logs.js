// src/adapters/logs.js

const logAdapter = {
    // Para los UseCases y Repositorios
    getInstance: (context) => ({
        log: ({ message, data }) => console.log(`[LOG][${context}]: ${message}`, data || ''),
        error: ({ message, error }) => console.error(`[ERROR][${context}]: ${message}`, error || ''),
        warn: ({ message, data }) => console.warn(`[WARN][${context}]: ${message}`, data || '')
    }),

    // Para el test-order.js (uso directo)
    log: ({ message, data }) => console.log(`[LOG]: ${message}`, data || ''),
    error: ({ message, error }) => console.error(`[ERROR]: ${message}`, error || ''),
    warn: ({ message, data }) => console.warn(`[WARN]: ${message}`, data || '')
};

module.exports = { logAdapter };