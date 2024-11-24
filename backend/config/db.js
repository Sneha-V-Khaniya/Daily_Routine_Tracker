const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connectionURL = process.env.MONGODB_CONN_URL || "mongodb://localhost:27017/DRT-MERN";
        await mongoose.connect(connectionURL);
        console.log("MongoDB Connected...!");

    }
    catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;