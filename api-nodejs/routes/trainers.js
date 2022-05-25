const { Trainer, validate } = require('../model/trainer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin =require('../MiddleWares/beAdmin');
const confirm = require('../MiddleWares/vertifyToken.js');


let nxt_ip = 1 ;
router.post( '/register' ,async ( req , res ) =>{

    // check if the user in the database ;
    const emailExsit = await Trainer.findOne({ email: req.body.email }) ;
    if( emailExsit ){
        return res.status( 400 ).send( 'Email already exists'  ) ;
    }


    // hash password ;
    const salt = await bcrypt.genSalt( 10 ) ;
    const hashPassword = await bcrypt.hash( req.body.password , salt ) ;
    
    nxt_ip++ ;
    const user = new Trainer({
        id:nxt_ip,
        name: req.body.name,
        email: req.body.email ,
        password: hashPassword ,
        isAdmin : req.body.isAdmin
    });

    try{
        const saveUser = await user.save() ;
        // res.send( saveUser ) ; 
        res.send({ user: user._id }) ;  
    }catch( err ){
        res.status( 400 ).send( err ) ;
    }
}); 


router.post('/login',async ( req , res )=>{
        
    // check if the user in the database ;
    const user = await Trainer.findOne({ email: req.body.email }) ;
    if( !user ){
        return res.status( 400 ).send( 'Email not exists in BD'  ) ;
    }

    // password is correct 
    const vaildPass  = await bcrypt.compare( req.body.password , user.password ) ;
    if( !vaildPass ) return res.status( 400 ).send( 'invaild password' );


    // create and assgin a token ;
    const token = jwt.sign({_id: user._id} , process.env.TOKEN_SECRET );
    res.header('auth-token' , token ).send( "login Dn" ) ;
    
});

router.get('/user/:id',  async ( req , res ) =>{
    
    const user = await Trainer.findOne({ id: req.params.id }) ;
    if( !user ){
        return res.status( 400 ).send( 'ID not exists in BD'  ) ;
    }

    console.log( "i am found user " ) ;
    res.send( user ) ;
});

router.get('/alluser', async ( req , res ) =>{
    
    const user = await Trainer.find() ;
    if( !user ){
        return res.status( 400 ).send( 'Email not exists in BD'  ) ;
    }

    console.log( " i am found user " ) ;
    res.send( user ) ;
});

router.delete( '/user/:id' , [confirm] , async ( req , res ) =>{
    
    const user = await Trainer.findOne({ id: req.params.id }) ;
    if( !user ){
        return res.status( 400 ).send( 'ID not exists in BD'  ) ;
    }  

    try {
        const removedProject = await Trainer.remove({
            id: req.params.id
        })
        res.json(removedProject)
    } catch (err) {
        res.json({
            message: err
        })
    }

});



// Update ;
router.put( '/user/:id' ,[confirm], async ( req , res ) =>{
   
    const exsit = await Trainer.findOne({ id: req.params.id }) ;
    if( !exsit ){
        return res.status( 400 ).send( 'ID not exists in BD'  ) ;
    }  


    try {
        const removedProject = await Trainer.remove({
            id: req.params.id
        })
        // res.json(removedProject)
    } catch (err) {
        res.json({
            message: err
        })
    }


    const salt = await bcrypt.genSalt( 10 ) ;
    const hashPassword = await bcrypt.hash( req.body.password , salt ) ;

    const user = new Trainer({
        id:exsit.id,
        name: req.body.name,
        email: req.body.email ,
        password: hashPassword ,
        isAdmin : req.body.isAdmin 
    });

    try{
        const saveUser = await user.save() ;
        res.send( "Update Dn" ) ; 
        // res.send({ user: user._id }) ;  
    }catch( err ){
        res.status( 400 ).send( err ) ;
    }

});



module.exports = router;