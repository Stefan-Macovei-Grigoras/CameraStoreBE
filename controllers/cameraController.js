// controllers/cameraController.js

const axios = require('axios');

const getAllCameras = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/cameras');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching cameras:', error);
        res.status(500).json({ error: 'Failed to fetch cameras' });
    }
};

const getCameraById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`http://localhost:4000/cameras/${id}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Camera not found' });
        } else {
            console.error('Error fetching camera by ID:', error);
            res.status(500).json({ error: 'Failed to fetch camera' });
        }
    }
};

const createCamera = async (req, res) => {
    const { name, price, description } = req.body;
    // Validate request data
    if (!name || !price || !description) {
        return res.status(400).json({ error: 'Name, price, and description are required' });
    }
    try {
        const response = await axios.post('http://localhost:4000/cameras', { name, price, description });
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating camera:', error);
        res.status(500).json({ error: 'Failed to create camera' });
    }
};

const updateCamera = async (req, res) => {
    const id = req.params.id;
    const { name, price, description } = req.body;
    // Validate request data
    if (!name && !price && !description) {
        return res.status(400).json({ error: 'At least one field (name, price, description) is required for update' });
    }
    try {
        const response = await axios.put(`http://localhost:4000/cameras/${id}`, { name, price, description });
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Camera not found' });
        } else {
            console.error('Error updating camera:', error);
            res.status(500).json({ error: 'Failed to update camera' });
        }
    }
};

const deleteCamera = async (req, res) => {
    const id = req.params.id;
    try {
        await axios.delete(`http://localhost:4000/cameras/${id}`);
        res.sendStatus(204);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Camera not found' });
        } else {
            console.error('Error deleting camera:', error);
            res.status(500).json({ error: 'Failed to delete camera' });
        }
    }
};

module.exports = {
    getAllCameras,
    getCameraById,
    createCamera,
    updateCamera,
    deleteCamera
    
};

