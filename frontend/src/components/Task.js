import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

export const Task = ({inputTask, index, deleteTask, getSingleTask}) => {



  return <>
    <div className="task">
        <p>
            <b>{index + 1}.</b>
            { inputTask.name }
        </p>
        <div className="task-icons">
            <FaCheckDouble color="green" />
            <FaEdit color="purple" onClick={() => getSingleTask(inputTask)} />
            <FaRegTrashAlt color="red" onClick={() => deleteTask(inputTask._id)} />
        </div>
    </div>
  </>
}
