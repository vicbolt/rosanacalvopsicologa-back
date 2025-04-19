'use strict'

//MODULOS
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

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
import mensajeRoutes from './routes/mensaje.js'; // Changed to import
import userRoutes from './routes/user.js'; // Changed to import
import reviewRoutes from './routes/review.js'; // Changed to import
import courseRoutes from './routes/course.js';

//RUTAS
app.use('/api/', mensajeRoutes);
app.use('/api/', userRoutes);
app.use('/api/', reviewRoutes);
app.use('/api/', courseRoutes);

export default app;