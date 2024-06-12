'use strict';

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var EjemploSchema = Schema({
    title: String,
    content: String,
    // fecha: {type: Date, default: Date.now},
    // img: String,
})

module.exports = mongoose.model('Ejemplo', EjemploSchema)