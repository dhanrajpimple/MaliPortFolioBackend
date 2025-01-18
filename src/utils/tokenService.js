const jwt = require("jsonwebtoken");


// Generate Refresh Token
const generateRefreshToken = (payload) => {
    return jwt.sign({token:payload}, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {generateRefreshToken };
