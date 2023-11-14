import React, { useState } from "react";
import TaskContext from "./TaskContext";
import config from "../../config/Config";
import { useAlert } from "../AlertContext";

const TaskState = ({ children }) => {
  const intialTasks = [];
  const {showAlert} = useAlert()
 

  const [tasks, setTasks] = useState(intialTasks);
  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/fetchalltasks`,
        {
          method: "GET",
          headers: config.authHeader,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();

      // Update the state with the fetched tasks
      setTasks(data);
    } catch (error) {
      console.error("Error adding task:", error);
      
    }
  };

  // Add a Task
  const addTask = async (task) => {
    try {
        const response = await fetch(`${config.apiUrl}/addtask`, {
        method: "POST",
        headers: { ...config.authHeader },
        body: JSON.stringify({ task })
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();

      // Update the state with the newly added task
      setTasks([...tasks, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/deletetask/${id}`, 
        {
          method: "DELETE",
          headers: config.authHeader
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update the state by filtering out the deleted task
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      showAlert("Delete successfully" ,"success")
    } catch (error) {
      console.error("Error deleting task:", error);
      showAlert("Delete failed. Please try again.", "danger");
    }
  };

  // Update a task
  const editTask = async (taskId, updatedData) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/updatetask/${taskId}`, 
        {
          method: "PUT",
          headers: config.authHeader,
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();

      // Update the state with the updated task
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? data : task
      );

      setTasks(updatedTasks);
      showAlert("Edit successfully.", "success");
      

    } catch (error) {
      console.error("Error updating task:", error);
      showAlert("Edit failed. Please try again.", "danger");
    }
  };

  

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, fetchAllTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
