"use strict";

var validator = require("validator");
var Ejemplo = require("../models/ejemplo.js");
const { param } = require("../routes/ejemplo.js");

var controller = {
  datosCurso: (req, res) => {
    return res.status(200).send({
      curso: "Bakckend",
      autor: "Victor Robles",
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      msg: "Funciona el controlador",
    });
  },

  save: (req, res) => {
    //RECOGEMOS LOS PARAMETROS DEL POST
    var params = req.body;

    //VALIDAMOS LOS DATOS
    try {
      var validator_title = !validator.isEmpty(params.title);
      var validator_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        msg: "Los datos no han podido ser validados",
      });
    }

    //SI LA VALIDACIÓN ES CORRECTA
    if (validator_title && validator_content) {
      //CREAMOS EL OBJETO EN BASE AL MODELO
      var ejemploObj = new Ejemplo();

      //ASIGNAMOS SUS VALORES
      ejemploObj.title = params.title;
      ejemploObj.content = params.content;

      //LO GUARDAMOS EN LA BASE DE DATOS

      ejemploObj
        .save()
        .then(() => {
          return res.status(200).send({
            msg: "Los datos SI SE HAN GUARDADO",
            ejemploObj,
          });
        })

        .catch((err) => {
          return res.status(200).send({
            msg: "Los datos NO han GUARDADO",
            err,
          });
        });
    }
  },

  getEjemplos: (req, res) => {

    var query = Ejemplo.find({})
    var params = req.params.number

    if(params && params != undefined){
        query.limit(params);
    }
    
    query.sort("-_id").exec().then((ejemplos) => {
        if (ejemplos.length > 0) {
          return res.status(200).send({
            status: "success",
            ejemplos,
          });
        } else {
          return res.status(404).send({
            status: "error",
            message: "No hay ejemplos para mostrar.",
          });
        }
      })
 
      .catch((err) => {
        return res.status(500).send({
          status: "error",
          message: err,
        });
      });
  },

};

module.exports = controller;
