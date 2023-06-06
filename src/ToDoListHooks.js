import React, { useState, useEffect } from "react";
import './TodoList.css';

const TodoListHooks = () => {
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

  useEffect(() => {
    // Get tasks list from localStorage when component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasksList"));
    if (storedTasks) {
      setTasksList(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

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
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoListHooks;