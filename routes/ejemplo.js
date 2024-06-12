'use strict'

var express = require ('express');

//PRUEBA - BORRAR
var EjemploController = require('../controllers/ejemplo');


var router = express.Router();

//RUTAS DE PRUEBA - BORRAR
router.get('/test', EjemploController.test);
router.post('/datos-curso', EjemploController.datosCurso);
router.post('/save', EjemploController.save);
router.get('/getEjemplos/:number?', EjemploController.getEjemplos);

module.exports = router;