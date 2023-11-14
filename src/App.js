import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Components/Todo";

import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import About from "./Components/About";

import TaskState from "./Components/context/Tasks/Taskstate";
import { AuthState } from "./Components/context/Authentication/AuthState";
import Alert from "./Components/Alert";
// import { useState } from "react";
import { AlertProvider } from "./Components/context/AlertContext";





function App() {

  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null)
  //   }, 1500)
  // }



  return (
    <>
    <AlertProvider>
      <AuthState>
        <TaskState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<Todo  />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup  />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </TaskState>
      </AuthState>
      </AlertProvider>

    </>
  );
}

export default App;
