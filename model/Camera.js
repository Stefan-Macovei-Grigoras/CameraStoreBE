const { DataTypes } = require('sequelize');
const sequelize = require('../appFunctions/Connection');

const Camera = sequelize.define('camera', {
    cameraId: {
        type: DataTypes.STRING(36), // CHAR(36) equivalent in MySQL
        primaryKey: true,
        allowNull: false
    },
    cameraName: {
        type: DataTypes.STRING(50), // VARCHAR(50) in MySQL
        allowNull: false
    },
    cameraPrice: {
        type: DataTypes.INTEGER, // INT in MySQL
        allowNull: false
    },
    cameraDescription: {
        type: DataTypes.STRING(100), // VARCHAR(100) in MySQL
    }
    }, 
    {
        tableName: 'camera', // Specify the table name explicitly
        timestamps: false
    }
);

module.exports = Camera;
