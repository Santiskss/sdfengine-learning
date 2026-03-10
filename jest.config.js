module.exports = {
    testEnvironment: 'node',
  
    testMatch: [
      '**/__tests__/**/*.test.js', 
      '**/*.test.js'
    ],
  
    testPathIgnorePatterns: [
      '/node_modules/',
      // Para excluir integration tests: descomenta la línea siguiente
      // '.*integration.*',
    ],
  
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/**/index.js',
      '!**/node_modules/**',
    ],
  
    coverageDirectory: 'coverage',
  
    coverageReporters: ['text', 'lcov'],
  };