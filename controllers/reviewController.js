// controllers/reviewController.js

const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); 
const faker = require('faker'); 
const data = require('../data.json');
const { text } = require('body-parser');
const Review = require('../model/Review'); 

const generateNewReview = (cameraId) => {
    return {
        id: uuidv4(),
        cameraId,
        text: faker.lorem.paragraph()
    };
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

const getReviewsByCameraId = async (req, res) => {
    const { cameraId } = req.params;
    try {
        const reviews = await Review.findAll({ where: { cameraId } });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

const createReview = async (req, res) => {
    const { cameraId, text } = req.body;
    console.log(req.body);
    if (!cameraId) {
        return res.status(400).json({ error: 'Camera ID and text are required\n' });
    }
    try {
        const review = await Review.create({ 
            reviewId: uuidv4(),
            cameraId : cameraId,
            reviewText : text
        });
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review\n' });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await review.destroy();
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
    deleteReview,
    generateNewReview
};