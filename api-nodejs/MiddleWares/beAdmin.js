module.exports =  function( req , res , next ){
    const token = req.header('auth-token');
    if( !req.user.isAdmin ) return res.status( 403 ).send( 'you are not admin' );
   next();
}