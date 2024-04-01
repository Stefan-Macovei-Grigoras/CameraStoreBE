// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const cameraRoutes = require('./routes/cameraRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes so frontedn ca get the data
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const axios = require('axios');


// Routes
app.use('/cameras', cameraRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Functia pentru generarea de entitati noi
const generateNewEntity = () => {
    return {
        id: uuidv4(), // Generare ID unic
        name: faker.random.words(),
        price: faker.random.number({ min: 100, max: 5000 }),
        description: faker.lorem.sentence()
    };
};

// Intervalul in secunde intre adaugarea de entitati noi
const intervalSeconds = 60; // Schimba acest numar conform necesitatilor tale

// Programarea adaugarii de entitati noi la intervale regulate
setInterval(() => {
    const newEntity = generateNewEntity();
    axios.post(`http://localhost:${PORT}/cameras`, newEntity)
        .then(response => {
            console.log('New entity added:', response.data);
        })
        .catch(error => {
            console.error('Error adding new entity:', error);
        });
}, intervalSeconds * 1000);
