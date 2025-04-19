'use strict';

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  lugar: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  hora: { type: String, required: true },
  vigente: { type: Boolean, required: true },
  imagen: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;