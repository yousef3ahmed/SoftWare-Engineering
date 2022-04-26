const express = require( "express" ) ;
const app = express() ;

const port = process.env.port || 3300; 


var router = require("./Router/routering");

app.use("/api" , router) ;


app.listen( port ,  ()=>{ 
    console.log("listener .. " + port); 
});
