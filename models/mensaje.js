'use strict';

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var mensajeSchema = Schema({
    name: String,
    email: String,
    comPreference: String,
    time: String,
    phone: String,
    msg: String,
})

const Mensaje = mongoose.model('Mensaje', mensajeSchema);
export default Mensaje;