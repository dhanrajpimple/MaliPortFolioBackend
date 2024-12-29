const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.EMAIL_USER,
        passs:process.env.EMAIL_PASS,
    }
})

const sendEmail = async (to, subject, text)=>{
   const mainOptions = {
       from:process.env.EMAIL_USER,
       to,
       subject,
       text

   }
   await transporter.sendMail(mainOptions)
}

module.exports = sendEmail;