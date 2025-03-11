'use strict'

//MODULOS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');



//INICIO DE EXPRESS
var app = express();

// Middleware necesario
app.use(express.json());  // Esto permite leer JSON en req.body

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json())


//FICHEROS Y RUTAS
var mensaje_routes = require('./routes/mensaje')
var user_routes = require('./routes/user');

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


//RUTAS

app.use('/api/', mensaje_routes);
app.use('/api/', user_routes);


module.exports = app;