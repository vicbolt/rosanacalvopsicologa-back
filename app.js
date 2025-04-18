'use strict'

//MODULOS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//INICIO DE EXPRESS
var app = express();

// Configura CORS
app.use(cors({
    origin: ['http://localhost:4200', 'https://rosanacalvopsicologa.com'], // los dominios que pueden acceder
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));


// Middleware necesario
app.use(express.json());  // Esto permite leer JSON en req.body
app.use('/uploads', express.static('uploads')); // Para leer imagenes


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));

//FICHEROS Y RUTAS
var mensaje_routes = require('./routes/mensaje');
var user_routes = require('./routes/user');
var review_routes = require('./routes/review');
var course_routes = require('./routes/course');

//RUTAS
app.use('/api/', mensaje_routes);
app.use('/api/', user_routes);
app.use('/api/', review_routes);
app.use('/api/', course_routes);

module.exports = app;