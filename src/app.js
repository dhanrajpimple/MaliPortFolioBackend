const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const contactRoutes = require('./routes/contactRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const videoRoutes = require('./routes/videoRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const errorHandeler = require("./middlewares/errorHandel")


dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/video", videoRoutes)
app.use("/api/review", reviewRoutes)

app.use(errorHandeler)

module.exports  = app