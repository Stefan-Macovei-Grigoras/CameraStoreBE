const express = require('express');
const User = require('../model/User'); // Adjust path as needed
const Sequelize = require('sequelize');

async function handleRegister(req, res){
    const {username, password} = req.body;
    console.log(username, password);
    try{
        const userNameExists = await User.findOne({ where: { userName: username } });
        if (userNameExists) {
            return res.status(401).json({ message: 'Username not avaible' });
        }
        const newUser = await User.create({userName:username, userPassword: password});
        return res.status(201).json({message: 'User registered successfully'});
    } catch(error){
        if(error instanceof Sequelize.UniqueConstraintError){
            res.status(400).json({message: 'Username already exists'});
        } else {
            console.error(error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
}

module.exports = { handleRegister };