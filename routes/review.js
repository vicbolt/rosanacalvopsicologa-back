'use strict';

const express = require('express');
const reviewController = require('../controllers/review');

const router = express.Router();

// Route for creating a reviews
router.post('/createReview', reviewController.createReview);

// Route for getting all reviews
router.get('/getAllReviews', reviewController.getAllReviews);

// Route for getting revisado: false
router.get('/getNoRevisado', reviewController.getNoRevisado);

// Route for getting ACEPTADA: TRUE
router.get('/getAceptada', reviewController.getAceptada);

// Route for getting ACEPTADA: FALSE
router.get('/getNoAceptada', reviewController.getNoAceptada);

// Route for updating review status
router.post('/updateReviewStatus', reviewController.updateReviewStatus);

module.exports = router;