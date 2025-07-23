const jwt = require('jsonwebtoken');


const verifyToken = (req , res , next) =>{

   
    
    let authHeader = req.headers.Authorization || req.headers.authorization;

    console.log(authHeader);
    

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
        return res.status(401).json({message : "No token, access denied"});
        }

         try {
            const decode = jwt.verify(token , process.env.SECRET_KEY);

            req.user =decode;
            console.log("The decoded user is ", req.user);

            next()
        } catch (error) {
            res.status(400).json({message:"Token is not valid"})
        }
    }
}


module.exports = verifyToken;