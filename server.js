// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cameraRoutes = require('./routes/cameraRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const axios = require('axios');


app.use('/cameras', cameraRoutes);
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const generateNewCamera = () => {
    return {
        id: uuidv4(), 
        name: faker.random.words(),
        price: faker.random.number({ min: 100, max: 5000 }),
        description: faker.lorem.sentence()
    };
};


const intervalSeconds = 6000;

setInterval(() => {
    const Camera = generateNewCamera();
    axios.post(`http://localhost:${PORT}/cameras`, Camera)
        .then(response => {
            console.log('New entity added:', response.data);
        })
        .catch(error => {
            console.error('Error adding new entity:', error);
        });
}, intervalSeconds * 1000);
