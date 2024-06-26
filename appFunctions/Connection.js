// database/connection.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'MPP', 
    'root', 
    '', 
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.log('Connected to database.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;
