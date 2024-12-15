import "./App.css";
import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todo_list";

const App = () => {
  const [taskList, updateTaskList] = useState([]);
  const getInputRef = useRef();

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    updateTaskList(storedTaskList);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const hadleChangeCheckbox = (id) => {
    const newTaskList = [...taskList];
    const taskState = newTaskList.find((task) => task.id === id);
    taskState.completed = !taskState.completed;
    updateTaskList(newTaskList);
  };

  const addTask = () => {
    const name = getInputRef.current.value;
    if (name === "") return;
    const newTask = {
      id: uuidv4(),
      name: getInputRef.current.value,
      completed: false,
      isEditable: false,
    };
    updateTaskList((prev) => {
      return [...prev, newTask];
    });
    getInputRef.current.value = null;
  };

  const updateTask = (id, newTaskName) => {
    updateTaskList(
      taskList.map((task) =>
        task.id === id
          ? { ...task, name: newTaskName, isEditable: false }
          : task
      )
    );
  };

  const changeEditButton = (id) => {
    updateTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, isEditable: true } : task
      )
    );
  };
  const deleteTask = () => {
    const updatedTask = taskList.filter((task) => task.completed === false);
    updateTaskList(updatedTask);
  };
  return (
    <>
      <input ref={getInputRef} defaultValue="" />
      {console.log(taskList)}
      <button onClick={addTask}>Add Task</button>
      <button onClick={deleteTask}>Delete Task</button>
      <TodoList
        taskList={taskList}
        hadleChangeCheckbox={hadleChangeCheckbox}
        changeEditButton={changeEditButton}
        updateTask={updateTask}
      />
    </>
  );
};

export default App;
