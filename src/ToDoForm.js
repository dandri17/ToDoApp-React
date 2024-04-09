import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function ToDoForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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
      <button onClick={handleAddTask} className="addButton">Add Task</button>
      </div>
      <div><ul>
        { tasks.map((task) => (
          <li key={task.id} >
             <input type="checkbox" checked={task.completed}
              onChange={() => handleCompletedTask(task.id)} ></input>
            <div className="task">{task.task}</div>
            <button className="deleteButton" onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li> /* Ne koristimo indexes kao keys već id. Matej je rekao da je potrebno dodati: {id: nekiRandomId, task: newTask} 
          Dakle, treba i kreirati random id. +++RIJEŠENO+++ */
        ))}
      </ul></div>
      
    </div>
  );
}

export default ToDoForm;
