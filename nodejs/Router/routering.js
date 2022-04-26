var express = require('express'),
    router = express.Router();

router.get('/', function( req , res ){
    res.send("Main") ;
    console.log("work");
}) ;

router.get('/admin', function( req , res ){
    res.send("admin") ;
}) ;

router.get('/login', function( req , res ){
    res.send("Login Page") ;
}) ;

router.get('/Coach', function( req , res ){
    res.send("Coach") ;
}) ;

router.get('/trainer', function( req , res ){
    res.send("trainer") ;
}) ;


module.exports = router ;