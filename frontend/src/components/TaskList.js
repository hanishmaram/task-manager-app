import { useEffect, useState } from "react"
import { Task } from "./Task"
import TaskForm from "./TaskForm"
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImage from '../assets/loader.gif';



const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState(false);
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

            getTasks();

        } catch (error) {
            toast.error(error.message);
        }

    };

    const getTasks = async () => {

        try {
            setIsLoading(true);
            const { data }= await axios.get(`${URL}/api/tasks`);
            setTasks(data);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
            console.log(error);
        }

    }

    const deleteTask = async (id) => {

        try {
            
            await axios.delete(`${URL}/api/tasks/${id}`)
            getTasks();

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    const getSingleTask = async (task) => {
        setFormData({name: task.name, completed: false});
        setTaskId(task._id);
        setIsEditing(true);
    }

    const updateTask = async (e) => {
        e.preventDefault();

        if(name === "")
            return toast.error("Input field cannot be empty.");

        try {
            
            await axios.put(`${URL}/api/tasks/${taskId}`, formData);
            toast.success("Task updated sucessfully")
            setFormData({...formData, name : ""});
            getTasks();

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {

        getTasks();

    },[]);


  return <>
    <h2>Task Manager</h2>
    <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask}  />
    <div className="--flex-between --pb">
        <p>
            <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
            <b>Completed Tasks:</b> 0
        </p>
    </div>
    <hr />
    {
        isLoading && (
             <div className="--flex-center">
                <img src={loadingImage} alt="loading" />
             </div>
        )
    }
    {
        !isLoading && tasks.length === 0 ? (
            <p className="--py">No task added. Please add a task.</p>
        ) : (
            <>
                {tasks.map((task, index) => {
                    return <Task key={index} index={index} inputTask={task} deleteTask={deleteTask} getSingleTask={getSingleTask} />
                })}
            </>
        )
    }
  </>
}

export default TaskList