
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Train = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    ticketPrice: {
        type: String
    }
})

var CreditCard = new Schema({
    name: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    cardNumber: {
        type: String
    },
    cvc: {
        type: String
    },
    total: {
        type: String
    }
})

var MobilePayment = new Schema({
    mobileNumber: {
        type: String
    },
    pin: {
        type: String
    },
    amount: {
        type: String
    }
})

var User = new Schema({
    email:{
        type: String
    },
    uname: {
        type: String
    },
    password: {
        type: String
    }
})


mongoose.model('Train', Train);
mongoose.model('CreditCard', CreditCard);
mongoose.model('MobilePayment', MobilePayment);
mongoose.model('User', User);

module.exports = mongoose;
