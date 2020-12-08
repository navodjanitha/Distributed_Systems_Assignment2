const express = require('express');
const trainRoutes = express.Router();
const trainController = require('./trainController');

trainRoutes.route('/addTrain')
    .post(trainController.addTrain);

trainRoutes.route('/getAllTrains')
    .get(trainController.getAllTrains);

trainRoutes.route('/getTrain/:_id')
    .get(trainController.getTrain);
module.exports = trainRoutes;
