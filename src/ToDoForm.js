import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function ToDoForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    const newTodo = {
      id: uuidv4(),
      task: newTask
    };
    setTasks([...tasks, newTodo]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    const todoList = tasks.filter((task) => task.id !== id);
    setTasks(todoList);
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        { tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li> /* Ne koristimo indexes kao keys već id. Matej je rekao da je potrebno dodati: {id: nekiRandomId, task: newTask} 
          Dakle, treba i kreirati random id. +++RIJEŠENO+++ */
        ))}
      </ul>
    </div>
  );
}

export default ToDoForm;
