require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');  // Import the routes file
const connectDB = require('./db');  // Import the connectDB function from db.js
 
// Initialize Express App
const app = express();
 
// Middlewares
app.use(cors());
app.use(bodyParser.json());
 
// Connect to the database
connectDB();  // Call the connectDB function to establish a connection to MongoDB
 
// Use routes
app.use('/api', routes);  // Use the routes under /api endpoint
 
// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});