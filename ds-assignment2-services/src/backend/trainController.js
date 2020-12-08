const express = require('express');
const todoRoutes = express.Router();
let mongoose = require('./DBSchema');
var TrainSchema = mongoose.model('Train');

const addTrain = function (req,res,next) {
    let train = new TrainSchema(req.body);

    train.save().then(train =>{
        res.status(200).json({
            'train': 'train added successfully'
        })
    }).catch(err=>{
        res.status(404).send('adding failed');
    });
};

const getAllTrains = function(req,res,next){

    TrainSchema.find(function (err, trainSchema) {
        if (err){
            console.log(err);
        } else{
            res.json(trainSchema);
        }
    });

};

const getTrain = function(req,res){
    let id = req.params._id;

    TrainSchema.findById(id, function (err, trainSchema) {
        res.json(trainSchema);
    });
};

module.exports = {
    addTrain,
    getAllTrains,
    getTrain
}
