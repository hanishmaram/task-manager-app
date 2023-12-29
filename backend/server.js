const dotenv = require("dotenv");
const express = require('express');
const connectDB = require("./config/connectDB");

const app = express();

dotenv.config();

// Routes
app.get("/", (req,res) => {
    res.send("Home Page");
})


const PORT = process.env.PORT || 5000; 
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();

