const jwt = require("jsonwebtoken")


function isAuth(req,res,next){
    const secretKey = "doItOrRegretIt";    // left plain for dev. purpose | Should be stored in .env file 
    jwt.verify(req.get("auth-token"),secretKey,(err,data)=>{
        if(err){
            res.status(401).json({
                message:"Invalid Token"
            })
            return;
        }
        req.GSTIN = data;
        next()

    })

}

module.exports = isAuth;