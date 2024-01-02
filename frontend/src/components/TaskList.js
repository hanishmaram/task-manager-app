import { useState } from "react"
import { Task } from "./Task"
import TaskForm from "./TaskForm"
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";



const TaskList = () => {

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    }); 
    const { name } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const createTask = async (e) => {

        e.preventDefault();

        if(name === "")
            return toast.error("Input field cannot be empty.");

        try {
            
            await axios.post(`${URL}/api/tasks`, formData);
            toast.success("Task added sucessfully")
            setFormData({...formData, name : ""});

        } catch (error) {
            toast.error(error.message);
        }

        console.log(formData);

    };

    const getTask = async () => {

        try {
            
            const tasks= await axios.get(`${URL}/api/taks`);
            console.log(tasks);

        } catch (error) {
            toast.error(error.message);
        }

    }


  return <>
    <h2>Task Manager</h2>
    <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} />
    <div className="--flex-between --pb">
        <p>
            <b>Total Tasks:</b> 0
        </p>
        <p>
            <b>Completed Tasks:</b> 0
        </p>
    </div>
    <hr />
    <Task />
  </>
}

export default TaskList