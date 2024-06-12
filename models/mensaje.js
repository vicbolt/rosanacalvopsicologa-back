'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mensaje = Schema({
    name: String,
    email: String,
    comPreference: String,
    time: String,
    phone: String,
    msg: String,
})

module.exports =  mongoose.model('Mensaje', mensaje)
