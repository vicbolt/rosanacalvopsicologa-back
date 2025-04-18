'use strict';

const express = require('express');
const courseController = require('../controllers/course');
const router = express.Router();

// IMPORTAR MULTER CONFIG
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// RUTAS
router.post('/createCourse', upload.single('imagen'), courseController.createCourse);
router.get('/getAllCourses', courseController.getAllCourses);
router.get('/getVigentes', courseController.getVigentes);

// Route for deleting a course
router.delete('/deleteCourse/:id', courseController.deleteCourse);

// Route for marking a course as not vigente
router.post('/markCourseAsNotVigente/:id', courseController.markCourseAsNotVigente);

module.exports = router;
