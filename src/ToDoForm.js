import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';

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
      alert("Unesite zadatak!"); 
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
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter task"
        className="inputTask"
      /></div>
      <div>
      <Button onClick={handleAddTask} className="addButton">Add Task</Button>
      </div>
      <div><ul>
        { tasks.map((task) => (
          <li key={task.id}>
             <input type="checkbox" checked={task.completed}
              onChange={() => handleCompletedTask(task.id)} ></input>
            <div className={`"task" ${task.completed ? "completed" : ""}`}>{task.task}</div>
            <Button variant="contained" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
          </li> /* Ne koristimo indexes kao keys već id. Matej je rekao da je potrebno dodati: {id: nekiRandomId, task: newTask} 
          Dakle, treba i kreirati random id. +++RIJEŠENO+++ */
        ))}
      </ul></div>
      
    </div>
  );
}

export default ToDoForm;