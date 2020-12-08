const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');

userRoutes.route('/addUser')
    .post(userController.addUser);

userRoutes.route('/getUser/:email/:password')
    .get(userController.getUser);

userRoutes.route('/getUser/:email')
    .get(userController.getUserEmail);

module.exports = userRoutes;
