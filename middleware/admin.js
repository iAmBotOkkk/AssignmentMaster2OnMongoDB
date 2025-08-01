// Middleware for handling auth
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
function adminMiddleware(req,res,next){

    const token = req.headers.authorization
    const word = token.split(" ")
    const jwtToken = word[1]
    const decodedValue = jwt.verify(jwtToken , JWT_SECRET)

    if(decodedValue.username){
        next();
    } else{
        res.status(403).json({
            msg : "You are not authenticated"
        })
    }

}
module.exports = adminMiddleware