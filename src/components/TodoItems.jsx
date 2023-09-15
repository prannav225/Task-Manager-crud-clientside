// TodoItem.jsx
import React, { useState } from "react";

const TodoItem = ({ task, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    task: task.task,
    taskDescription: task.taskDescription,
  });

  const handleSave = () => {
    handleEdit(task._id, editedTask.task, editedTask.taskDescription);
    setIsEditing(false);
  };

  return (
    <div className="task-list">
      {isEditing ? (
        // Render edit form
        <div className="edit-form card">
          <div className="card-header">
            <input
              type="text"
              value={editedTask.task}
              onChange={(e) =>
                setEditedTask({ ...editedTask, task: e.target.value })
              }
            />
          </div>
          <div className="card-description">
            <textarea
              cols={35}
              rows={8}
              type="text"
              value={editedTask.taskDescription}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  taskDescription: e.target.value,
                })
              }
            />
          </div>
          <div className="actions">
            <button onClick={handleSave} className="btn save">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Render task
        <div className="card">
          <div className="card-header">
            <h3>{task?.task}</h3>
          </div>
          <div className="card-description">
            <p>{task?.taskDescription}</p>
          </div>
          <div className="actions">
            <button
              className="material-symbols-outlined delete btn"
              onClick={() => handleDelete(task._id)}
            >
              delete
            </button>
            <button
              className="material-symbols-outlined btn edit"
              onClick={() => setIsEditing(true)}
            >
              edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
