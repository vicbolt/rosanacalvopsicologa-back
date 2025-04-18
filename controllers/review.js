"use strict";

const Review = require("../models/review");

const reviewController = {
  createReview: async (req, res) => {
    const { nombre, edad, motivo, review, revisado, aceptada } = req.body;

    try {
      const newReview = new Review({ nombre, edad, motivo, review, revisado, aceptada });
      await newReview.save();
      return res.status(201).send({
        msg: "Review created successfully",
        review: newReview
      });
    } catch (err) {
      console.error("Error creating review:", err);
      return res.status(500).send({
        msg: "Error creating review",
        err
      });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find();
      return res.status(200).send({
        msg: "Reviews retrieved successfully",
        reviews
      });
    } catch (err) {
      console.error("Error retrieving reviews:", err);
      return res.status(500).send({
        msg: "Error retrieving reviews",
        err
      });
    }
  },

  getNoRevisado: async (req, res) => {
    try {
      const unreviewedReviews = await Review.find({ revisada: false });
      return res.status(200).send({
        msg: "Unreviewed reviews retrieved successfully",
        reviews: unreviewedReviews
      });
    } catch (err) {
      console.error("Error retrieving unreviewed reviews:", err);
      return res.status(500).send({
        msg: "Error retrieving unreviewed reviews",
        err
      });
    }
  },

  getAceptada: async (req, res) => {
    try {
      const reviewedReviews = await Review.find({ aceptada: true, revisada: true });
      return res.status(200).send({
        msg: "Reviewed reviews retrieved successfully",
        reviews: reviewedReviews
      });
    } catch (err) {
      console.error("Error retrieving reviewed reviews:", err);
      return res.status(500).send({
        msg: "Error retrieving reviewed reviews",
        err
      });
    }
  },

  getNoAceptada: async (req, res) => {
    try {
      const reviewedReviews = await Review.find({ aceptada: false, revisada: true });
      return res.status(200).send({
        msg: "Reviewed reviews retrieved successfully",
        reviews: reviewedReviews
      });
    } catch (err) {
      console.error("Error retrieving reviewed reviews:", err);
      return res.status(500).send({
        msg: "Error retrieving reviewed reviews",
        err
      });
    }
  },

  updateReviewStatus: async (req, res) => {
    const { id, revisada, aceptada } = req.body;

    try {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { revisada, aceptada },
        { new: true }
      );

      if (!updatedReview) {
        return res.status(404).send({
          msg: "Review not found"
        });
      }

      return res.status(200).send({
        msg: "Review status updated successfully",
        review: updatedReview
      });
    } catch (err) {
      console.error("Error updating review status:", err);
      return res.status(500).send({
        msg: "Error updating review status",
        err
      });
    }
  }

};

module.exports = reviewController;