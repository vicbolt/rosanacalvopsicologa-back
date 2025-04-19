"use strict";

import Course from "../models/course.js";

const courseController = {
  createCourse: async (req, res) => {
    const { titulo, descripcion, lugar, fechaInicio, fechaFin, hora, vigente } =
      req.body;

    if (!req.file) {
      return res.status(400).send({ msg: 'No se ha subido ninguna imagen' });
    }

    try {
      const newCourse = new Course({
        titulo,
        descripcion,
        lugar,
        fechaInicio,
        fechaFin,
        hora,
        vigente: vigente === 'true',
        imagen: req.file.filename,
      });

      await newCourse.save();

      return res.status(201).send({
        msg: 'Course created successfully',
        course: {
          ...newCourse.toObject(),
          imagen: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
        },
      });
    } catch (err) {
      console.error('Error creating course:', err);
      return res.status(500).send({
        msg: 'Error creating course',
        err,
      });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      return res.status(200).send({
        msg: 'Courses retrieved successfully',
        courses,
      });
    } catch (err) {
      console.error('Error retrieving courses:', err);
      return res.status(500).send({
        msg: 'Error retrieving courses',
        err,
      });
    }
  },

  getVigentes: async (req, res) => {
    try {
      const vigenteCourses = await Course.find({ vigente: true });
      return res.status(200).send({
        msg: 'Vigente courses retrieved successfully',
        courses: vigenteCourses,
      });
    } catch (err) {
      console.error('Error retrieving vigente courses:', err);
      return res.status(500).send({
        msg: 'Error retrieving vigente courses',
        err,
      });
    }
  },

  deleteCourse: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
        return res.status(404).send({
          msg: "Course not found"
        });
      }
      return res.status(200).send({
        msg: "Course deleted successfully",
        course: deletedCourse
      });
    } catch (err) {
      console.error("Error deleting course:", err);
      return res.status(500).send({
        msg: "Error deleting course",
        err
      });
    }
  },

  markCourseAsNotVigente: async (req, res) => {
    const { id } = req.params;

    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { vigente: false },
        { new: true }
      );

      if (!updatedCourse) {
        return res.status(404).send({
          msg: "Course not found"
        });
      }

      return res.status(200).send({
        msg: "Course marked as not vigente successfully",
        course: updatedCourse
      });
    } catch (err) {
      console.error("Error marking course as not vigente:", err);
      return res.status(500).send({
        msg: "Error marking course as not vigente",
        err
      });
    }
  }
};

export const { createCourse, getAllCourses, getVigentes, deleteCourse, markCourseAsNotVigente } = courseController;
