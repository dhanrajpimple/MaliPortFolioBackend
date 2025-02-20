const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
    
  } catch (error) {
    console.log("database connection error");
    console.log(error);
    process.exit(1)
  }
}


module.exports = connectDB