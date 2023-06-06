import React, { useState } from "react";
import './TodoList.css';
function TodoList() {
  const [tasksList, setTasksList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      content: newTask.trim(),
    };

    setTasksList([...tasksList, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasksList = tasksList.filter((task) => task.id !== taskId);
    setTasksList(updatedTasksList);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="todo-list-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add</button>
        <ul className="list-container">
          {tasksList.map((task) => (
            <li key={task.id} className="task">
              {task.content}
              <button onClick={ () => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;