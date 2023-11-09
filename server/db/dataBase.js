const mongoose = require('mongoose');
// const mongooseUrl = "mongodb://127.0.0.1:27017/TodoContextPro"; // Specify the database name
require('dotenv').config(); // Load environment variables from .env file

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        });
        console.log("Connected to MongoDB successfully!");
       
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = connectToMongo;
