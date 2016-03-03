var jwt =require('jsonwebtoken');

exports.signIn =function(user){
    return jwt.sign(
        {username:user.username, admin:user.admin},
        global.SAL_KEY,
        {
            expiresInMinutes:1 // Expira em 1 minuto
        }
    );
};

exports.authorize = function(req, res, next){
    var token = req.body.toke || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        res.status(401).json({
            message:'Token inválido'
        });
    }else{
        jwt.verify(token,global.SAL_KEY, function(error, decoded){
            if(error){
                   res.status(401).json({
                        message:'Token inválido'
               });
            }else{
                next();
            }
        })
    }
};

exports.isAdmin = function(req, res, next){
    var token = req.body.toke || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        res.status(401).json({
            message:'Token inválido'
        });
    }else{
        jwt.verify(token,global.SALT_KEY, function(error, decoded){
            if(error){
                   res.status(401).json({
                        message:'Token inválido'
               });
            }else{
                if(decoded.admin){
                    next();    
                }else{
                     res.status(401).json({
                        message:'usuário sem permissão'});
                }
            }
        })
    }
};