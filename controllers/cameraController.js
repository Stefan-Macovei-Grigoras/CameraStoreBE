// controllers/cameraController.js

const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); 
const faker = require('faker'); 
const data = require('../data.json');
const Camera = require('../model/Camera');
const sequelize = require('../appFunctions/Connection');

const getAllCameras = async (req, res) => {
    try {
        const cameras = await Camera.findAll();
        res.json(cameras);
    } catch (error) {
        console.error('Error fetching cameras:', error);
        res.status(500).json({ error: 'Failed to fetch cameras' });
    }
};

const getCameraById = async (req, res) => {
    const id = req.params.id;
    try {
        const camera = await Camera.findByPk(id);
        if (camera) {
            res.json(camera);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Error fetching camera by ID:', error);
        res.status(500).json({ error: 'Failed to fetch camera' });
    }
};

const createCamera = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const camera = await Camera.create({
            cameraId: uuidv4(),
            cameraName: name,
            cameraPrice: price,
            cameraDescription: description
        });
        res.status(201).json(camera);
    } catch (error) {
        console.error('Error creating camera:', error);
        res.status(500).json({ error: 'Failed to create camera' });
    }
};

const updateCamera = async (req, res) => {
    const id = req.params.id;
    const { name, price, description } = req.body;
    try {
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
        res.status(500).json({ error: 'Failed to update camera' });
    }
};

const deleteCamera = async (req, res) => {
    const id = req.params.id;
    try {
        const camera = await Camera.findByPk(id);
        if (camera) {
            await camera.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Camera not found' });
        }
    } catch (error) {
        console.error('Error deleting camera:', error);
        res.status(500).json({ error: 'Failed to delete camera' });
    }
};

module.exports = {
    getAllCameras,
    getCameraById,
    createCamera,
    updateCamera,
    deleteCamera
};