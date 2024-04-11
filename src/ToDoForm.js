import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function ToDoForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 

  const handleAddTask = () => {
    if (newTask.trim() !== ""){
    const newTodo = {
      id: uuidv4(),
      task: newTask
    };
    setTasks([...tasks, newTodo]);
    setNewTask(""); } 
    else {
      return; 
  }};

  const handleDeleteTask = (id) => {
    const todoList = tasks.filter((task) => task.id !== id);
    setTasks(todoList);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleCompletedTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }; 

  return (
   
    <div className="mainContainer">
      <h1>ToDo App</h1>
      <div>
      <TextField variant="outlined" color="primary" focused value={newTask}
        onChange={handleInputChange}
        placeholder="Enter task"
        className="inputTask"
      /></div>
      <div>
      <Button variant="contained" color="primary" style={{margin: "35px"}} onClick={handleAddTask} className="addButton"><ControlPointIcon/>Add Task</Button>
      </div>
      <div><ul>
        { tasks.map((task) => (
          <li key={task.id}>
             <input type="checkbox" checked={task.completed}
              onChange={() => handleCompletedTask(task.id)} ></input>
            <div className={`"task" ${task.completed ? "completed" : ""}`}>{task.task}</div>
            <Button variant="outlined" color="error" style={{margin: "10px 15px"}} onClick={() => handleDeleteTask(task.id)}><DeleteIcon />Delete</Button>
          </li> /* Ne koristimo indexes kao keys već id. Matej je rekao da je potrebno dodati: {id: nekiRandomId, task: newTask} 
          Dakle, treba i kreirati random id. +++RIJEŠENO+++ */
        ))}
      </ul></div>
      
    </div>
  );
}

export default ToDoForm;