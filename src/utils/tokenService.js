const jwt  = require("jsonwebtoken")


const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expirseIn:"15m"});
}

const verifyToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:"7d"})


}

module.exports = {generateToken, verifyToken}