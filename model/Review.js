const { DataTypes } = require('sequelize');
const sequelize = require('../appFunctions/Connection');

const Review = sequelize.define('review', {
        reviewId: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            allowNull: false,
        },
        cameraId: {
            type: DataTypes.STRING(36),
            allowNull: false,
        },
        reviewText: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        tableName: 'review', // Specify the table name explicitly
        timestamps: false
    }
);

module.exports = Review;