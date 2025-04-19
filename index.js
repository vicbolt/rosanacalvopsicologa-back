'use strict';

import mongoose from 'mongoose';
import app from './app.js';



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


export default app; // Exporta la aplicación Express
