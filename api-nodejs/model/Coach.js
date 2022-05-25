const Joi = require('@hapi/joi');
const mongoose = require('mongoose') ;

const userSchema = mongoose.model('Coach', new mongoose.Schema({
    
    id:{
        type: Number ,
        require: true
    },
    name:{
        type: String,
        require: true,
        min : 6,
        max:255
    },
    email:{
        type: String,
        require: true,
        max : 255,
        min:6 
    },
    password:{
        type:String,
        require: true,
        max: 1024,
        min:6
    },
    date:{
        type: Date,
        default: Date.now
    },
    //coachAdmin 
    isAdmin:{
        type:Boolean,
        require:true
    }

}));

function validateCoach(Coach) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean().required()
     
    };
    return Joi.validate(Coach, schema);
}
exports.Coach = this.Coach;
exports.validate = validateCoach;