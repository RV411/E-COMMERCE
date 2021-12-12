function errorHandler(err,req,res,next){
    //* Error de autenticacion JWT
    if(err.name==='UnauthorizedError'){
        return res.status(401).json({message:"Usuario no autorizado"});
    }
    //* Error de validacion
    if(err.name=='ValidationError'){
        return res.status(401).json({message:err});
    }
    //* Error de servidor
    return res.status(500).json(err);
}


module.exports=errorHandler;
