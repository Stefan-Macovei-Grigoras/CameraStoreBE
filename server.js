// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cameraRoutes = require('./routes/cameraRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const addNewCameraPeriodically = require('./appFunctions/cameraGenerator')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;
 
app.use(bodyParser.json());
app.use(cors());

app.use('/reviews', reviewRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/cameras', cameraRoutes);


addNewCameraPeriodically(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



