import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';
import routes from './routes/index.js';


//Load the environment variables from .env file
dotenv.config();

//initialse express app
const app = express();
const PORT = process.env.PORT||5000;
//const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = 'mongodb://localhost:27017/photoshareapp2';

//Middleware to parse JSON bodies
app.use(express.json());

//Routes
app.use('/api', routes)

//Use mkcert-generated certificates for HTTPS
const sslOptions = {
    key: fs.readFileSync('certs/localhost-key.pem'),
    cert: fs.readFileSync('certs/localhost.pem')
}

//Add MongoDB connection
mongoose.connect(MONGODB_URI,{
}).then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

//HTTPS SERVER
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running ${PORT}`);
})

//Start the server
// app.listen(PORT,()=>{
//     console.log('Server is running on port ${PORT}');
// });


