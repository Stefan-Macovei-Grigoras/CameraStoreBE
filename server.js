const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const cameraRoutes = require('./routes/cameraRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes so frontedn ca get the data

// Routes
app.use('/cameras', cameraRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
