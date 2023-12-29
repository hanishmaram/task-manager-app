const dotenv = require("dotenv");
const express = require('express');
const connectDB = require("./config/connectDB");
const Task = require("./model/taskModel");


const app = express();

dotenv.config();

app.use(express.json());

// parse the data from url encoded data
//app.use(express.urlencoded({extended:false}));

function logger(req, res, next) {
    console.log("Logger");
    console.log(req.method);

    next();
    console.log("After request");
}

// Routes
app.get("/", (req,res) => {
    res.send("Home Page");
})

// Create a Task
app.post("/api/tasks", logger, async (req, res) => {

    try {
    
        const task = await Task.create(req.body);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).send({msg: error.message});
    }

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

