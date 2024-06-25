'use strict';

var mongoose = require('mongoose');
const cors = require('cors');
var app = require('./app');

//AUTORIZACIONE
app.use(cors({
    origin: '*', // Permite solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permite cookies y encabezados de autorización
}));

mongoose.Promise = global.Promise;

//CONEXION DE LA BASE DE DATOS
var url = 'mongodb+srv://vicboltmadrid:IJXgDWBNSPQBhDcJ@rosanadb.mtxmv1m.mongodb.net/?retryWrites=true&w=majority&appName=RosanaDB';

const connectDB = async () => {
    try {
        await mongoose.connect(url, { useUnifiedTopology: true });
        console.log('Success! DB Connected');
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};

connectDB();

//CONEXION CON EL SERVIDOR
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});

module.exports = app; // Exporta la aplicación Express
