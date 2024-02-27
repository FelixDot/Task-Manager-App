import { useState } from "react";
import TaskCard from "./TaskCard";
import "./board.css";
import TaskFrom from "./TaskFrom";
import boardsService from "../service/boards"
import tasksService from "../service/tasks"

const Board = ({ board, setBoard }) => {
  const [showTaskFrom, setShowTaskFrom] = useState(true);

  const groupedTasked = board.tasks.reduce((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {});

  const columns = [
    { id: "Backlog", color: "blue" },
    { id: "In Progress", color: "yellow" },
    { id: "In Review", color: "purple" },
    { id: "Completed", color: "green" },
  ];

  const addTask = async (taskObject) => {
    console.log(taskObject)
    const newTask = await boardsService.addTask(taskObject, board.id)
    const updatedBoard = { ...board };
    updatedBoard.tasks.push(newTask);

    setBoard(updatedBoard);

  }

  const deleteTask = async(taskId)=>{
     await tasksService.deleteTask(taskId)
     const updatedtasks = board.tasks.filter(t => t.id !== taskId)
     const updatedBoard = {...board,tasks:updatedtasks }
     setBoard(updatedBoard)
  }

  const updateTask = async(taskObject)=>{
    console.log(taskObject.taskDescription)
    const updatedTask = await tasksService.updateTask(taskObject)
    const updatedtasks = board.tasks.map(t => t.id !== updatedTask.id ? t : updatedTask)
     const updatedBoard = {...board,tasks:updatedtasks }
     console.log(updatedBoard)
     setBoard(updatedBoard) 
  }

  return (
    <div className="boardGrid">
      {columns.map((column) => (
        <div className="boardColumn" key={column.id} id={column.id}>
          <h4 className="title">
            <span
              className="circle"
              style={{ backgroundColor: `${column.color}` }}
            ></span>
            {column.id}({groupedTasked[column.id]?.length || 0})
          </h4>
          {groupedTasked[column.id]?.map((task, n) => (
            <TaskCard key={n} tasks={task} deleteTask={deleteTask} updateTask={updateTask}/>
          ))}
          {column.id == "Backlog" ? (
            <button
              className="addTaskButton"
              onClick={() => setShowTaskFrom((prev) => !prev)}
            >
              Add task
            </button>
          ) : null}
        </div>
      ))}
      {showTaskFrom ? <TaskFrom addTask={addTask} show={setShowTaskFrom}/> : null}
    </div>
  );
};
export default Board;
