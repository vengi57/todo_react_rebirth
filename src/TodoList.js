import React, { useState } from "react";

const TodoList = ({
  taskList,
  hadleChangeCheckbox,
  changeEditButton,
  updateTask,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [editBoolean, upDateEditBoolean] = useState(false);
  const handleChange = (value) => {
    setNewTaskName(value);
  };
  return (
    <div>
      {taskList.map((taskName) => (
        <div key={taskName.id}>
          {taskName.isEditable ? (
            <input
              key={taskName.id}
              type="text"
              onChange={(e) => handleChange(e.target.value)}
            />
          ) : (
            <label>
              <input
                type="checkbox"
                checked={taskName.completed}
                onChange={() => hadleChangeCheckbox(taskName.id)}
              />
              {taskName.name}
            </label>
          )}

          {taskName.isEditable ? (
            <button onClick={() => updateTask(taskName.id, newTaskName)}>
              {" "}
              Update Task{" "}
            </button>
          ) : (
            <button onClick={() => changeEditButton(taskName.id)}>
              Edit Task{" "}
            </button>
          )}
        </div>
      ))}
      <div>{taskList.length} taks is remaining to complete</div>
    </div>
  );
};

export default TodoList;
