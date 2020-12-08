const express = require('express');
const paymentRoutes = express.Router();
const paymentController = require('./paymentController');

paymentRoutes.route('/addCardPayment')
    .post(paymentController.addCardPayment);

paymentRoutes.route('/addMobilePayment')
    .post(paymentController.addMobilePayment);

module.exports = paymentRoutes;
