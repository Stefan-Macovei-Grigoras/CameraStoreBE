const { DataTypes } = require('sequelize');
const sequelize = require('../appFunctions/Connection');

const User = sequelize.define('user',{
    userName:{
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
    },
    userPassword:{
        type:DataTypes.STRING(100),
        allowNull: false
    }
    },
    {
        tableName: 'user',
        timestamps: false
    }
);

module.exports = User;