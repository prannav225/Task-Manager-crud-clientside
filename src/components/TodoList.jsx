// TodoList.jsx
import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

import TodoItem from "./TodoItems";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]); 

  const handleAddTodo = async (formattedTask, taskDescription) => {
    try {
      const taskData = {
        task: formattedTask,
        taskDescription: taskDescription,
      };
      const response = await axios
        .post("http://localhost:5000/todos", taskData)
        .then((res) => {
          alert(res.data.message);
          todos.current.value = "";
        });

      if (response.status === 200) {
        setTodos([...todos, response.data.task]);
      } else {
        console.error("Add task request failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const handleEditTodo = async (taskId, task, taskDescription) => {
    try {
      // Send a PUT request to update the task
      const response = await axios.put(
        `http://localhost:5000/todos/${taskId}`,
        {
          task,
          taskDescription,
        }
      );

      if (response.status === 200) {
        // Find the index of the edited task in the todos state
        const editedTaskIndex = todos.findIndex((t) => t._id === taskId);

        if (editedTaskIndex !== -1) {
          // Create a copy of the todos array
          const updatedTodos = [...todos];

          // Update the edited task in the copy of the todos array
          updatedTodos[editedTaskIndex] = response.data.updatedTask;

          // Update the todos state with the edited task
          setTodos(updatedTodos);
        }
      } else {
        console.error("Edit task request failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async (taskId) => {
    // window.confirm method to show a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task permanently?"
    );

    if (confirmDelete) {
      try {
        // Sending DELETE request to the backend API to delete a task
        const response = await axios.delete(
          `http://localhost:5000/todos/${taskId}`
        );
        if (response.status === 200) {
          // Updating the local state to remove the deleted task
          setTodos(todos.filter((task) => task._id !== taskId));
        } else {
          // Handle errors
          console.error("Delete request failed.");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");

        if (response.status === 200) {
          setTodos(response.data.tasks);
        } else {
          console.error("Fetch request failed.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchTasks();
  }, [todos]);

  return (
    <div>
      <TodoForm handleAddTodo={handleAddTodo} />

      <div>
        <h2 className="logo">Task List</h2>
        <div className="task-cards">
          {todos.map((task, index, taskDescription) => (
            <TodoItem
              task={task}
              handleDelete={handleDelete}
              key={index}
              handleEdit={handleEditTodo}
              taskDescription={taskDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
