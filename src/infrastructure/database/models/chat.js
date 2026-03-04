module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
      prompt: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    return Chat;
  };