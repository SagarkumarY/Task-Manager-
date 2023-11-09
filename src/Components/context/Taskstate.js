import React, { useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = ({ children }) => {
  const intialTasks = [];

  const [tasks, setTasks] = useState(intialTasks);
  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tasks/fetchalltasks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NzU2MjMwMzUxNTJkY2FlYjk0YzJmIn0sImlhdCI6MTY5OTE3MzkyM30.a6VGAJQi9cjw3mBjXsTg7MJVw4n8aGSd_H_xGfZV-aE", // Replace with your actual auth token
          },
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
      const response = await fetch("http://localhost:5000/api/tasks/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NzU2MjMwMzUxNTJkY2FlYjk0YzJmIn0sImlhdCI6MTY5OTE3MzkyM30.a6VGAJQi9cjw3mBjXsTg7MJVw4n8aGSd_H_xGfZV-aE", // Replace with your actual auth token
        },
        body: JSON.stringify({ task }),
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
        `http://localhost:5000/api/tasks/deletetask/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NzU2MjMwMzUxNTJkY2FlYjk0YzJmIn0sImlhdCI6MTY5OTE3MzkyM30.a6VGAJQi9cjw3mBjXsTg7MJVw4n8aGSd_H_xGfZV-aE", // Replace with your actual auth token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Update the state by filtering out the deleted task
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update a task
  const editTask = async (taskId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/updatetask/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0NzU2MjMwMzUxNTJkY2FlYjk0YzJmIn0sImlhdCI6MTY5OTE3MzkyM30.a6VGAJQi9cjw3mBjXsTg7MJVw4n8aGSd_H_xGfZV-aE", // Replace with your actual auth token
          },
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
    } catch (error) {
      console.error("Error updating task:", error);
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
