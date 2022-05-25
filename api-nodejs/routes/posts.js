const router = require( 'express' ).Router() ;
const verify = require('../MiddleWares/vertifyToken');

router.get('/' , verify , (req , res)=>{
    res.json({
        posts:{
            title:'this first post',
            desc:'random data'
        }
    });
});

module.exports = router ;