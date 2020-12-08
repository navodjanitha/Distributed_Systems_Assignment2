const express = require('express');
let mongoose = require('./DBSchema');
var creditCardSchema = mongoose.model('CreditCard');
var mobilePaymentSchema = mongoose.model('MobilePayment');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');

const addCardPayment = function (req,res,next) {
    let card = new creditCardSchema(req.body);

    card.save().then(card =>{
        res.status(200).json({
            'card': 'payment added successfully'
        })
    }).catch(err=>{
        res.status(404).send('adding failed');
    })

    var output =
        ` <b>Online Train Ticket Reservation</b>
          <p> Dear ${req.body.name}, </p>
          <p>We received your payment of ${req.body.total} successfully.</p>
          <p>Welcome back !</p>`;


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user:'demojayaratne@gmail.com',
            pass: 'demo12396#@'
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    let mailOptions = {
        from: '"Online Train Ticket Reservation" <demojayaratne@gmail.com>',
        to: req.body.mobileNumber,
        subject: 'Payment Confirmation',
        text: 'Hello',
        html: output
    };

    // This methos will send the payment confirmation email to the customer
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

};

const addMobilePayment = function (req,res,next) {
    let mobile = new mobilePaymentSchema(req.body);

    mobile.save().then(mobile =>{
        res.status(200).json({
            'mobile': 'mobile payment added successfully'
        })
    }).catch(err=>{
        res.status(404).send('adding failed');
    });

    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
        apiKey: 'febe4ff9',
        apiSecret: '3ymd49KlBsrmy2i2'
    })

    const from = 'Nexmo'
    const to = req.body.mobileNumber
    const text = 'We received your Train Ticket Payment of ' + req.body.amount +  ' successfully ! '
    nexmo.message.sendSms(from, to, text)
}

module.exports = {
    addCardPayment,
    addMobilePayment
}
