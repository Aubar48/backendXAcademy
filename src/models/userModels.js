const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dabase'); // Asegúrate de que la ruta sea correcta

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Sequelize crea automáticamente las columnas createdAt y updatedAt
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Asegúrate de que coincida con el nombre de tu tabla
    timestamps: false // Esto crea automáticamente las columnas createdAt y updatedAt
});

module.exports = User;
