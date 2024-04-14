// controllers/reviewController.js

const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); 
const faker = require('faker'); 
const data = require('../data.json');
const { text } = require('body-parser');

const generateNewReview = (cameraId) => {
    return {
        id: uuidv4(),
        cameraId,
        text: faker.lorem.paragraph()
    };
};

const getAllReviews = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/reviews');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

const getReviewsByCameraId = async (req, res) => {
    try {
        const { cameraId } = req.params;
        // Use cameraId to filter reviews and fetch only the ones associated with that camera
        const filteredReviews = data.reviews.filter(review => review.cameraId === cameraId);
        res.json(filteredReviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};


const createReview = async (req, res) => {
    const { cameraId, text } = req.body;
    console.log(`cameraId: ${cameraId}, text: ${text}`);
    if (!cameraId || !text) {
        return res.status(400).json({ error: 'Camera ID and text are required' });
    }
    try {
        const id = uuidv4();
        const response = await axios.post('http://localhost:4000/reviews', { id, cameraId, text});
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
};

const updateReview = async (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required for update' });
    }
    try {
        const index = data.reviews.findIndex(review => review.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Review not found' });
        }
        data.reviews[index] = { ...data.reviews[index], text };
        res.json(data.reviews[index]);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Failed to update review' });
    }
};

const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const index = data.reviews.findIndex(review => review.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Review not found' });
        }
        data.reviews.splice(index, 1);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

module.exports = {
    getAllReviews,
    getReviewsByCameraId,
    createReview,
    //updateReview,
    deleteReview,
    generateNewReview
};
