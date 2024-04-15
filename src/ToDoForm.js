import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import './App.css'
// --------------------------------------------------------
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';

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
    if (newTask.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        task: newTask
      };
      setTasks([...tasks, newTodo]);
      setNewTask("");
    }
    else {
      return;
    }
  };

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

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (

    <div className="main-container">
      <h1>ToDo App</h1>
      <div className="task-form">
        <TextField variant="outlined" color="primary"
          focused value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter task"
          style={{ width: "450px" }}
        />
        <Button variant="contained" color="primary"
          style={{ marginLeft: "3px" }}
          onClick={handleAddTask}
          className="addButton">
          <ControlPointIcon />Add Task</Button>
      </div>
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div onClick={() => handleToggleTask(task.id)} className={task.completed ? "completed" : ""}>
                <input type="checkbox" checked={task.completed}
                  onChange={() => handleCompletedTask(task.id)} ></input>
                <label className={`"task" ${task.completed ? "completed" : ""}`}>{task.task}</label>
              </div>
              <Button variant="outlined" color="error" style={{ margin: "10px 15px" }} onClick={() => handleDeleteTask(task.id)}><DeleteIcon />Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// return (

//   <div className="mainContainer">
//     <h1>ToDo App</h1>
//     <div style={{display:"flex", justifyContent:"center" , alignItems:"center"}}>
//     <TextField variant="outlined" color="primary" focused value={newTask}
//       onChange={handleInputChange}
//       onKeyDown={handleKeyPress}  
//       placeholder="Enter task"
//       style={{width:"300px"}}
//     />
//     <Button variant="contained" color="primary" style={{marginLeft: "30px"}} onClick={handleAddTask} className="addButton"><ControlPointIcon/>Add Task</Button>
//     </div>
//     <div><List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
//       { tasks.map((task) => (
//         <ListItem key={task.id}>
{/* -------------------------------------------------------------------------------------------------------------------- */ }
{/* <div onClick={() => handleToggleTask(task.id)} className={task.completed ? "completed" : ""}> 
            <input type="checkbox" checked={task.completed}
            onChange={() => handleCompletedTask(task.id)} ></input>
            <label className={`"task" ${task.completed ? "completed" : ""}`}>{task.task}</label>
          </div>
          <Button  variant="outlined" color="error" style={{margin: "10px 15px"}} onClick={() => handleDeleteTask(task.id)}><DeleteIcon />Delete</Button> */}
{/* -------------------------------------------------------------------------------------------------------------- */ }
{/* <ListItemButton role={undefined} onClick={handleToggleTask(task.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': task.id }}
                />
              </ListItemIcon>
              <ListItemText id={task.id} primary={task.task} />
            </ListItemButton>
        </ListItem> /* 
      Ne koristimo indexes kao keys već id. Matej je rekao da je potrebno dodati: {id: nekiRandomId, task: newTask}  */}
//         Dakle, treba i kreirati random id. +++RIJEŠENO+++ */
//       ))}
//     </List></div>

//   </div>
// );
// }

export default ToDoForm;

