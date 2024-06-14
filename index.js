'use strict';

// var mongoose = require('mongoose');
// const cors = require('cors');

// var app = require('./app')
// var port = 4400;

// app.use(cors({
//     origin: '*', // Permite solicitudes desde este origen
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
//     credentials: true // Permite cookies y encabezados de autorización
// }));

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/rosana', { useNewUrlParser: true }).then(() =>{
//     console.log('Success! DB Connected')

//     app.listen(port, () =>{
//         console.log('El servidor corre en el puerto ' + port)
//     })
// })


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vicboltmadrid:IJXgDWBNSPQBhDcJ@rosanadb.mtxmv1m.mongodb.net/?retryWrites=true&w=majority&appName=RosanaDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


