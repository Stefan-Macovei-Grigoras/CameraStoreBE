// controllers/cameraController.js


const { v4: uuidv4 } = require('uuid'); 
const Camera = require('../model/Camera');
const Review = require('../model/Review'); 
const jwt = require('jsonwebtoken');
// const secretKey = process.env.REACT_APP_SECRET_TOKEN_KEY;
const secretKey = "UBB"

const getAllCameras = async (req, res) => {
    const authHeader = req.headers.authorization; // Retrieve the token from the request headers
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        const cameras = await Camera.findAll();
        res.json(cameras);
    } catch (error) {
        console.error('Error fetching cameras:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            res.status(500).json({ error: 'Failed to fetch cameras' });
        }
    }
};

const getCameraById = async (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers.authorization; // Retrieve the token from the request headers

    // Check if the token is present in the request headers
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // Verify and decode the token
        console.log(token.decoded);
        const decoded = jwt.verify(token, secretKey);
        //const userId = decoded.userId;
        const camera = await Camera.findByPk(id);
        if (camera) {
            res.json(camera);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Error fetching camera by ID:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            res.status(500).json({ error: 'Failed to fetch camera' });
        }
    }
};

const createCamera = async (req, res) => {
    const authHeader = req.headers.authorization; // Retrieve the token from the request headers
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    const token = authHeader.split(' ')[1];
    const { name, price, description } = req.body;
    try {
        const decoded = jwt.verify(token, secretKey);
        const camera = await Camera.create({
            cameraId: uuidv4(),
            cameraName: name,
            cameraPrice: price,
            cameraDescription: description
        });
        res.status(201).json(camera);
    } catch (error) {
        console.error('Error creating camera:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            res.status(500).json({ error: 'Failed to create camera' });
        }
    }
};

const updateCamera = async (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers.authorization; // Retrieve the token from the request headers

    // Check if the token is present in the request headers
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    const token = authHeader.split(' ')[1];
    const { name, price, description } = req.body;
    try {
        const decoded = jwt.verify(token, secretKey);
        const camera = await Camera.findByPk(id);
        if (camera) {
            await camera.update({
                cameraName: name,
                cameraPrice: price,
                cameraDescription: description
            });
            res.json(camera);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Error updating camera:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            res.status(500).json({ error: 'Failed to update camera' });
        }
    }
};

const deleteCamera = async (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers.authorization; // Retrieve the token from the request headers

    // Check if the token is present in the request headers
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        // First, find and delete all reviews associated with the camera
        await Review.destroy({ where: { cameraId: id } });

        // Then, delete the camera itself
        const camera = await Camera.findByPk(id);
        if (camera) {
            await camera.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Error deleting camera:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
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