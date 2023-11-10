import React, { useContext, useEffect, useState, useRef } from "react";
import TaskContext from "./context/TaskContext";

function Todo() {
  const context = useContext(TaskContext);
  const { tasks, addTask, editTask, deleteTask, fetchAllTasks } = context;
  const [task, setTask] = useState("");
  const [editedTaskText, setEditedTaskText] = useState({ etask: " ", id: "" }); // To store the edited task text

  // Declare ref properly
  const ref = useRef(null);

  useEffect(() => {
    fetchAllTasks();
    // eslint-disable-next-line
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    addTask(task);

    // Clear the input field
  document.querySelector('input[name="task"]').value = "";

    // Reset the task input fihandleEditTask eld after adding the task
    setTask("");
  };

  const onChange = (e) => {
    setTask(e.target.value);
  };

  /// edit on change
  const editOnChange = (e) => {
    // setEditedTaskText(e.target.value);
    setEditedTaskText({ etask: e.target.value, id: editedTaskText.id });
  };

  ////// edit here
  const handleEditClick = (currentTask) => {
    // setEditedTaskText(currentTask.task,currentTask._id); // Set the edited task text
    setEditedTaskText({ etask: currentTask.task, id: currentTask._id });

    ref.current.click();
  };

  const handleEditTask = () => {
    // editTask(editedTaskText.id, editedTaskText.etask)

    // Update the task with the editedTaskText
    editTask(editedTaskText.id, { task: editedTaskText.etask });
    // Close the modal
    ref.current.click();
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn d-none btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  style={{ width: "100%", padding: "5px 5px" }}
                  type="text"
                  name="etask"
                  placeholder="Enter Edit task"
                  // value={editedTaskText}
                  value={editedTaskText.etask}
                  onChange={editOnChange}
                  required
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditTask}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////  modal end*/}
      <div className="container containers">
        <h1>Todo List</h1>
       
        <div className="form_container">
        {task.length > 0 && task.length < 5 && (
              <p className="error-message message_alert text-white mt-2">
                Task must be at least 5 characters long.
              </p>
            )}
          <form>
         
            <input
              type="text"
              name="task"
              placeholder="Add a new task"
              onChange={onChange}
              minLength={5}
              required
            />
           
            <button type="submit" id="btn_addBtn" onClick={handleClick}>
              Add Task
            </button>
           
          </form>
        
        </div>
        <ul>
          {tasks.length === 0 ? <h1>No Tasks to display!</h1> : null}
          {tasks.map((item, index) => (
            <li key={index}>
              {item.task}{" "}
              <div>
                <button
                  type="submit"
                  id="btn_editBtn"
                  className="editBtn"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  id="btn_deleteBtn"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
