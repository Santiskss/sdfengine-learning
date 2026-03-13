const { Model, DataTypes } = require('sequelize');
// Importamos tu instancia Singleton (asegúrate de que la ruta relativa sea correcta)
const databaseConnection = require('../connection.database'); 

class OrderDatabaseModel extends Model {}

OrderDatabaseModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // En la base de datos se guardará como customer_id por el underscored: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending',
    },
    // No definimos createdAt manualmente aquí porque tu clase de conexión
    // ya activa timestamps: true y lo mapea a created_at automáticamente.
  },
  {
    // Accedemos a la instancia de Sequelize de tu clase
    sequelize: databaseConnection.sequelize,
    modelName: 'OrderDatabaseModel',
    tableName: 'order',
    // IMPORTANTE: Tu clase connection define timestamps: true y underscored: true
    // Al ponerlo aquí, Sequelize gestionará automáticamente created_at y updated_at
    timestamps: true,
    underscored: true,
  }
);

module.exports = OrderDatabaseModel;