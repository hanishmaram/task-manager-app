const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");

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

const getTask = async (req, res) => {

    try {
        
        const {id} = req.params;
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({msg: `Task not found for id : ${id}`});
        }
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

// Delete task
const deleteTask = async (req, res) => {

    try {
        
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);

        if(!task) {
            return res.status(404).json({msg: `No task with id : ${id}`});
        }

        res.status(200).send("Task deleted.")

    } catch (error) {
        res.status(500).json({msg:error.message});
    }

}

// Update a Task
const updateTask = async (req, res) => {

    try {
        
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id : id}, req.body, {new: true, runValidators: true} 
            );

        if(!task) {
            return res.status(404).json({msg:`Task with given id not available id: ${id}`});
        }
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}



module.exports = { 
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
 }