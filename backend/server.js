const dotenv = require("dotenv");
const express = require('express');
const connectDB = require("./config/connectDB");
const taskRoutes = require('./routes/taskRoute');
//const Task = require("./model/taskModel");


const app = express();

dotenv.config();

app.use(express.json());

// parse the data from url encoded data
//app.use(express.urlencoded({extended:false}));

app.use("/api/tasks", taskRoutes);

// function logger(req, res, next) {
//     console.log("Logger");
//     console.log(req.method);

//     next();
//     console.log("After request");
// }

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

