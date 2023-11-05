const mongoose = require('mongoose');
const mongooseUrl = "mongodb://127.0.0.1:27017/TodoContextPro"; // Specify the database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseUrl, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

        });
        console.log("Connected to MongoDB successfully!");
       
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = connectToMongo;
