// TodoForm.jsx
import React, { useRef } from "react";

const TodoForm = ({ handleAddTodo }) => {
  let todo = useRef();
  let taskDescription = useRef();

  const handleAddClick = (e) => {
    e.preventDefault();
    const taskText = todo.current.value.trim();
    const descriptionText = taskDescription.current.value.trim(); // Get the description input value

    if (taskText && descriptionText !== "") {
      const formattedTask =
        taskText.charAt(0).toUpperCase() + taskText.slice(1);

      handleAddTodo(formattedTask, descriptionText); 
      todo.current.value = ""; //clear title field
      taskDescription.current.value = ""; // Clear the description 
    }
  };

  return (
    <form action="" className="task-form">
      <div className="task">
        <div style={{ textAlign: "left", marginLeft: "40px" }}>
          <label htmlFor="">Task Title: </label>
        </div>
        <input
          type="text"
          placeholder="Add your task title"
          ref={todo}
          name="todo"
          className="input-task"
          required
        />
      </div>

      <div className="description">
        <div style={{ textAlign: "left", marginLeft: "45px" }}>
          <label htmlFor="">Description: </label>
        </div>
        <input
          type="text"
          placeholder="Add your task description..."
          ref={taskDescription}
          name="taskDescription"
          className="input-task"
          required
        />
      </div>

      <button
        style={{ cursor: "pointer" }}
        className="add"
        onClick={handleAddClick}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
