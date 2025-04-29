'use strict';

import Review from '../models/review.js';
import transporter from "../emailTransporter.js"; 

const senderEmail = transporter.options.auth.user;

const reviewController = {
  createReview: async (req, res) => {
    const { nombre, edad, motivo, review, revisada, aceptada } = req.body;

    try {
      const newReview = new Review({
        nombre,
        edad,
        motivo,
        review,
        revisada,
        aceptada,
      });
      await newReview.save();

      // Configurar el correo electrónico
      const mailOptions = {
        from: senderEmail,
        to: senderEmail,
        subject: 'Nueva reseña disponible',
        html: `
              <h1>Nueva Reseña</h1>
              <p>Tienes una nueva reseña en la página web pendiente de validar:</p>
              <ul>
                <li><strong>Nombre:</strong> ${nombre}</li>
                <li><strong>Edad:</strong> ${edad}</li>
                <li><strong>Motivo:</strong> ${motivo}</li>
                <li><strong>Reseña:</strong> ${review}</li>
              </ul>

              <a href="rosanacalvopsicologa.com">Rosanacalvopsicologa.com</a>
              
            `,
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
        } else {
          console.log('Correo electrónico enviado:', info.response);
        }
      });

      return res.status(201).send({
        msg: 'Review created successfully',
        review: newReview,
      });
    } catch (err) {
      console.error('Error creating review:', err);
      return res.status(500).send({
        msg: 'Error creating review',
        err,
      });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find();
      return res.status(200).send({
        msg: 'Reviews retrieved successfully',
        reviews,
      });
    } catch (err) {
      console.error('Error retrieving reviews:', err);
      return res.status(500).send({
        msg: 'Error retrieving reviews',
        err,
      });
    }
  },

  getNoRevisado: async (req, res) => {
    try {
      const unreviewedReviews = await Review.find({ revisada: false });
      return res.status(200).send({
        msg: 'Unreviewed reviews retrieved successfully',
        reviews: unreviewedReviews,
      });
    } catch (err) {
      console.error('Error retrieving unreviewed reviews:', err);
      return res.status(500).send({
        msg: 'Error retrieving unreviewed reviews',
        err,
      });
    }
  },

  getAceptada: async (req, res) => {
    try {
      const reviewedReviews = await Review.find({
        aceptada: true,
        revisada: true,
      });
      return res.status(200).send({
        msg: 'Reviewed reviews retrieved successfully',
        reviews: reviewedReviews,
      });
    } catch (err) {
      console.error('Error retrieving reviewed reviews:', err);
      return res.status(500).send({
        msg: 'Error retrieving reviewed reviews',
        err,
      });
    }
  },

  getNoAceptada: async (req, res) => {
    try {
      const reviewedReviews = await Review.find({
        aceptada: false,
        revisada: true,
      });
      return res.status(200).send({
        msg: 'Reviewed reviews retrieved successfully',
        reviews: reviewedReviews,
      });
    } catch (err) {
      console.error('Error retrieving reviewed reviews:', err);
      return res.status(500).send({
        msg: 'Error retrieving reviewed reviews',
        err,
      });
    }
  },

  updateReviewStatus: async (req, res) => {
    const { id, revisada, aceptada } = req.body;

    try {
      const updatedReview = await Review.findByIdAndUpdate(
        { _id: id },
        { revisada, aceptada },
        { new: true }
      );

      if (!updatedReview) {
        return res.status(404).send({
          msg: 'Review not found',
        });
      }

      return res.status(200).send({
        msg: 'Review status updated successfully',
        review: updatedReview,
      });
    } catch (err) {
      console.error('Error updating review status:', err);
      return res.status(500).send({
        msg: 'Error updating review status',
        err,
      });
    }
  },
};

export const { createReview, getAllReviews, getNoRevisado, getAceptada, getNoAceptada, updateReviewStatus } = reviewController;
