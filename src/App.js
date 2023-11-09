import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Components/Todo";
// import { TodoProvider } from "./Components/ContextTodo";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import About from "./Components/About";
import TaskState from "./Components/context/Taskstate";

function App() {
  return (
    <>
     
      <TaskState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Todo />} />

            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </TaskState>
     
    </>
  );
}

export default App;
