const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require( 'dotenv' ) ;
const port = process.env.port || 3300; 
 // import posts ;
 var postRoute = require( './routes/posts' );

 // import Coach
 var authCoach = require("./routes/authCoach.js") ;

 //import trainer 
 var trainerRoute = require("./routes/trainers")
 //import search experience
 var experience = require("./routes/Experience")
dotenv.config();

// connect to DB 
mongoose.connect( process.env.DB_CONNECT).then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));

app.use( express.json() ) ;


 //Route middlewares ;
app.use("/api/Coach" , authCoach) ;

app.use("/api/Trainer" , trainerRoute) ;

app.use("/api/experience" , experience) ;

app.use( "/api/posts" , postRoute );

app.listen( port ,  ()=>{ 
    console.log("Server Up and Running on port " + port); 
});






