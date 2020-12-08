const express = require('express');
let mongoose = require('./DBSchema');
var userSchema = mongoose.model('User');
const nodemailer = require('nodemailer');

const addUser = function (req,res,next) {
    let user = new userSchema(req.body);

    user.save().then(user =>{
        res.status(200).json({
            'user': 'user added successfully'
        })
    }).catch(err=>{
        res.status(404).send('adding failed');
    });

    var output =
        ` <p> Hi ${req.body.uname}, </p>
          <p>Thank you for signing up.Lets find your train tickets and reserve with us.</p>
          <p></p>
          <p>Regards !</p>`;

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
        to: req.body.email,
        subject: 'SignUp Confirmation',
        text: 'Hello',
        html: output
    };

    // customer will get the sign up confirmation email
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

const getUser = function(req,res){
    let email = req.params.email;
    let password = req.params.password;

    userSchema.find({email: email, password: password}, function (err, userSchema) {
        res.json(userSchema);
    });
};

const getUserEmail = function(req,res){
    let email = req.params.email;

    userSchema.find({email: email}, function (err, userSchema) {
        res.json(userSchema);
    });
};

module.exports = {
    addUser,
    getUser,
    getUserEmail
}







