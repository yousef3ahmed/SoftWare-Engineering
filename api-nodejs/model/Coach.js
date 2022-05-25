const mongoose = require('mongoose') ;

const userSchema = mongoose.Schema({
    
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

});

module.exports = mongoose.model( 'Coach' , userSchema ) ;