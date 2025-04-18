const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: String, required: true },
  motivo: { type: String, required: true },
  review: { type: String, required: true },
  revisada: { type: Boolean, required: false },
  aceptada: { type: Boolean, required: false }

});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;