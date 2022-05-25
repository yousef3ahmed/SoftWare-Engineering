const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Trainer = mongoose.model('Trainer', new mongoose.Schema({
   
    id:{
        type: Number ,
        require: true
    }, 
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin:{
        type:Boolean,
        require:true
    }
}));

function validateUser(trainer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
     
    };
    return Joi.validate(trainer, schema);
}

exports.Trainer = Trainer;
exports.validate = validateUser;