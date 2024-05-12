const express = require('express');
const User = require('../model/User'); // Adjust path as needed
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const secretKey = "UBB";

async function handleLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName: username } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (password !== user.userPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = tokenGenerator();
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


function tokenGenerator() {
  // Define the payload (data you want to include in the token)
  const payload = secretKey
  
  // Replace 'your_secret_key' with a strong, unique secret key

  // Define token options (optional)
  const options = {
  };
  // Sign the token using the secret key and payload
  const token = jwt.sign(payload, secretKey, options);

  return token;
}

module.exports = {
  handleLogin
};
