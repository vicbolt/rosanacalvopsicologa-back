'use strict'

//MODULOS
var express = require('express');
var bodyParser = require('body-parser');


//INICIO DE EXPRESS
var app = express();

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


//FICHEROS Y RUTAS
var ejemplo_routes = require('./routes/ejemplo')
var mensaje_routes = require('./routes/mensaje')


// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


//RUTAS
// app.use('/', ejemplo_routes);
app.use('/api/', mensaje_routes);



module.exports = app;