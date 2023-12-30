const Task = require("../model/taskModel");

// Create a Task
const createTask = async (req, res) => {

    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).send({msg: error.message});
    }

}


// Get/Read Data
const getTasks = async (req,res) => {

    try {
        
        const tasks = await Task.find();
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).send({msg:error.message});
    }

}

module.exports = { 
    createTask,
    getTasks
 }