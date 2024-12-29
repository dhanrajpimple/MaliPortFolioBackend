const express = require("express")
const {register, login, resetPassword, sendOtp} = require("../controllers/authController")

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/reset-password', resetPassword)
router.post('/send-otp', sendOtp)

module.exports = router;