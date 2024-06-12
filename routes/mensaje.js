'use strict'

var express = require ('express');

//REALES
var MensajeController = require('../controllers/mensaje')

var router = express.Router();


//RUTAS DE VERDAD
router.post('/saveMsg', MensajeController.saveMsg)
router.get('/getMsg', MensajeController.getMsg)

module.exports = router;