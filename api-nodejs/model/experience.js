
const mongoose = require('mongoose');

const ExperienceSchema=  mongoose.Schema({
    name:{
        type: String,
        require: true,
        min : 6,
        max:255
    },
    by:{
        type: String,
        require: true,
        max : 255,
        min:6 
    }
   });

module.exports= mongoose.model("Experience",ExperienceSchema);