'use strict'

//MODULOS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//INICIO DE EXPRESS
var app = express();

// Definir las opciones de CORS 
const corsOptions = { 
    credentials: true, 
    origin: ['http://localhost:4200', 'https://rosanacalvopsicologa.com'] // Incluir en la lista blanca los dominios que desea permitir
}; 

app.use(cors(corsOptions)); // Utilice el middleware cors con sus opciones

// Middleware necesario
app.use(express.json());  // Esto permite leer JSON en req.body

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));

//FICHEROS Y RUTAS
var mensaje_routes = require('./routes/mensaje');
var user_routes = require('./routes/user');
var review_routes = require('./routes/review');

//RUTAS
app.use('/api/', mensaje_routes);
app.use('/api/', user_routes);
app.use('/api/', review_routes);

module.exports = app;