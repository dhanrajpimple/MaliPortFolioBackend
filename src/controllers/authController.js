const bcrypt = require("bcrypt")
const User = require("../models/User")
const {generateAccessToken, generateRefreshToken}  = require("../utils/tokenService")
const sendEmail = require("../utils/emailService")


const register = async (req, res)=>{
    const {username, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password:hashedPassword})

        res.status(201).json({message:"User Registered Successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user  = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
             return res.status(401).json({message:"invalid Credentials"})
        }
        const accessToken = generateAccessToken({id: user._id})
        const refreshToken = generateRefreshToken({id:user._id})

        res.status(200).json({accessToken, refreshToken})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const sendOtp = async (req, res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        await user.save()
        await sendEmail(email, "OTP for password reset", `Your OTP is ${otp}`)
        res.status(200).json({message:"OTP Sent to Email"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        if(user.otp !== otp){
            return res.status(400).json({message:"Invalid OTP"})
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null
        await user.save()
        await sendEmail(email, "Password Reset", "Your Password has been reset successfully")
        return res.status(200).json({message:"Password Reset Successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {register, login, resetPassword, sendOtp}