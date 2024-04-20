// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cameraRoutes = require('./routes/cameraRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const addNewCameraPeriodically = require('./appFunctions/cameraGenerator')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/cameras', cameraRoutes);
app.use('/reviews', reviewRoutes);

addNewCameraPeriodically(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



