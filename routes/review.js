'use strict';

import express from 'express';
import { createReview, getAllReviews, getNoRevisado, getAceptada, getNoAceptada, updateReviewStatus } from '../controllers/review.js';

const router = express.Router();

router.post('/createReview', createReview);
router.get('/getAllReviews', getAllReviews);
router.get('/getNoRevisado', getNoRevisado);
router.get('/getAceptada', getAceptada);
router.get('/getNoAceptada', getNoAceptada);
router.patch('/updateReviewStatus', updateReviewStatus);


export default router;