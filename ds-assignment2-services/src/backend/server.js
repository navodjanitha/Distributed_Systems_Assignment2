const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4001;
const componentRoutes = express.Router();
let Todo = require('./DBSchema');

app.use(cors());
app.use(bodyParser.json());

// using the all routes
const trainRouteHandler = require('./trainRoutes');
const cardRouteHandler = require('./paymentRoutes');
const userRouteHandler = require('./userRoutes');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/demo', {useNewUrlParser: true});

// establish the connection
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established succesfully !!!");
});

app.use('/demo', trainRouteHandler);
app.use('/demo', cardRouteHandler);
app.use('/demo', userRouteHandler);

// listen to the port
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

