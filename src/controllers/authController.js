const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");
const { generateRefreshToken } = require("../utils/tokenService");


const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Generate a JWT token with the user_id
        const id = await User.findOne({email})

        const token = generateRefreshToken(id);

        // Send the token to the client
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message, message1: "not register"});
    }
};
// Login User and Generate Refresh Token
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with the user_id
        const token = generateRefreshToken(user._id);

          
        res.json({ message: 'Login successful!',success:true, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout User

// Refresh Token

// Send OTP for Password Reset
const sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.otp = otp;
        await user.save();

        await sendEmail(email, "OTP for Password Reset", `Your OTP is ${otp}`);
        res.status(200).json({ message: "OTP Sent to Email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null; // Clear OTP after successful password reset
        await user.save();

        await sendEmail(email, "Password Reset", "Your Password has been reset successfully");
    
        const token = generateRefreshToken(user._id);

        // Send the token to the client
        res.status(201).json({ message: "Password Reset Successfully" , token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



module.exports = { login, register, sendOtp, resetPassword };
