function log  (req,res,next){
    console.log('authentication....');
    next()
};


module.exports= log