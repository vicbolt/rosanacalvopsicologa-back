'use strict';

var mongoose = require('mongoose');
const cors = require('cors');

var app = require('./app')
var port = 4400;

app.use(cors({
    origin: 'https://www.rosanapsicologa.es', // Permite solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permite cookies y encabezados de autorización
}));

mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://vicboltmadrid:du4oXtAwosfA0CMs@rosanadb.mtxmv1m.mongodb.net/?retryWrites=true&w=majority&appName=RosanaDB', { useNewUrlParser: true }).then(() =>{
    console.log('Success! DB Connected')

    app.listen(port, () =>{
        console.log('El servidor corre en el puerto ' + port)
    })
})