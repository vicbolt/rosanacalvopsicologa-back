'use strict';

var mongoose = require('mongoose');
const cors = require('cors');
var app = require('./app');
var url = 'mongodb+srv://vicboltmadrid:IJXgDWBNSPQBhDcJ@rosanadb.mtxmv1m.mongodb.net/?retryWrites=true&w=majority&appName=RosanaDB';

app.use(cors({
    origin: '*', // Permite solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Permite cookies y encabezados de autorización
}));

mongoose.Promise = global.Promise;

mongoose.connect(url, { useUnifiedTopology: true }).then(() => {
    console.log('Success! DB Connected');

    // Utiliza el puerto proporcionado por Vercel o por defecto al 3000
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });
}).catch(err => {
    console.error('Error connecting to the database', err);
});

module.exports = app; // Exporta la aplicación Express
