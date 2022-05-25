const router = require( 'express' ).Router() ;
const {Coach, validate } = require('../model/Coach');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const admin =require('../MiddleWares/beAdmin');
const confirm = require('../MiddleWares/vertifyToken.js');
let  nxt_ip = 1 ;

router.post( '/register' ,async ( req , res ) =>{
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
     let found = await Coach.findOne({email:req.body.email})
    if (found) {
        return res.status(400).send('That Email already exisits!');
    } else {
        
    // hash password ;
    const salt = await bcrypt.genSalt( 10 ) ;
    const hashPassword = await bcrypt.hash( req.body.password , salt ) ;
    
    nxt_ip++ ;
    const user = new Coach({
        id:nxt_ip,
        name: req.body.name,
        email: req.body.email ,
        password: hashPassword ,
        isAdmin: req.body.isAdmin
    });
        
    try{
        const saveUser = await user.save() ;
        // res.send( saveUser ) ; 
        res.send({ user: user._id }) ;  
    }catch( err ){
        res.status( 400 ).send( err ) ;
    }
    }
   
}); 


router.post('/login',async ( req , res )=>{
        
    // check if the user in the database ;
    const user = await Coach.findOne({ email: req.body.email }) ;
    if( !user ){
        return res.status( 400 ).send( 'Email not exists in BD'  ) ;
    }

    // password is correct 
    const vaildPass  = await bcrypt.compare( req.body.password , user.password ) ;
    if( !vaildPass ) return res.status( 400 ).send( 'invaild password' );


    // create and assgin a token ;
    const token = jwt.sign({_id: user._id,  isAdmin:user.isAdmin} , process.env.TOKEN_SECRET );
    res.header('auth-token' , token ).send( "login Dn" ) ;
    
}) ;

router.get('/user/:id',  async ( req , res ) =>{
    
    const user = await Coach.findOne({ id: req.params.id }) ;
    if( !user ){
        return res.status( 400 ).send( 'ID not exists in BD'  ) ;
    }

    console.log( "i am found user " ) ;
    res.send( user ) ;
}) ;

router.get('/alluser',  async ( req , res ) =>{
    
    const user = await Coach.find() ;
    if( !user ){
        return res.status( 400 ).send( 'Email not exists in BD'  ) ;
    }

    console.log( " i am found user " ) ;
    res.send( user ) ;
});

router.delete( '/user/:id' ,[confirm, admin], async ( req , res ) =>{
    
    const user = await Coach.findOne({ id: req.params.id }) ;
    if( !user ){
        return res.status( 400 ).send( 'ID not exists in DB'  ) ;
    }  

    try {
        const removedProject = await Coach.remove({
            id: req.params.id
        })
        res.json(removedProject)
    } catch (err) {
        res.json({
            message: err
        })
    }

});

router.put( '/user/:id' , [ confirm ], async ( req , res ) =>{
   
    const exsit = await Coach.findOne({ id: req.params.id }) ;
    if( !exsit ){
        return res.status( 400 ).send( 'ID not exists in BD'  ) ;
    }  


    try {
        const removedProject = await Coach.remove({
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

    const user = new Coach({
        id:exsit.id,
        name: req.body.name,
        email: req.body.email ,
        password: hashPassword ,
        isAdmin : req.body.isAdmin
    });

    try{
        const saveUser = await user.save() ;
        res.send( "Update Dn" ) ; 
        // res.send(user) ;  
    }catch( err ){
        res.status( 400 ).send( err ) ;
    }

});


/*Delet user*/
router.delete("/:id", [confirm,admin] , async(req,res)=>{
  
    const findCoach =await  Coach.findById(req.params.id).remove()
   
    if(!findCoach){
        res.send("user not found");
    }
    res.send('deleted done !');
})

/*GET activity page*/
router.get('/activity',[confirm] ,( req , res )=>{
    res.send("notification page") ;
}) ;
/*GET schedule page*/
router.get('/schedule', [confirm],( req , res )=>{
    res.send("schedule page") ;
}) ;
/*GET info page*/
router.get('/info',[confirm], ( req , res )=>{
    res.send("info page") ;
}) ;

router.use(session({
    secret:"secretkey 123xx",
    resave:false,
    saveUninitialized:true
}))
router.get("/",[confirm],(req,res)=>{
    if(req.session.pageView){
        req.session.pageView++
        res.send("you have visited that page before "+req.session.pageView+" times")
    }
    else{
        req.session.pageView=1
        res.send("welcome to swimming site for the first time!")
    }
})

module.exports = router ;