'use strict';

var mongoose = require('mongoose');
const cors = require('cors');

var app = require('./app')
var port = 4400;

const corsOptions = {
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permite cookies y encabezados de autorización
};

app.use(cors(corsOptions));

mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://vicboltmadrid:du4oXtAwosfA0CMs@rosanadb.mtxmv1m.mongodb.net/?retryWrites=true&w=majority&appName=RosanaDB', { useNewUrlParser: true }).then(() =>{
    console.log('Success! DB Connected')

    app.listen(port, () =>{
        console.log('El servidor corre en el puerto ' + port)
    })
})