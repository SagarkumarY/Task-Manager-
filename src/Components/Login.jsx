import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/Authentication/AuthContext";
import { useAlert } from "./context/AlertContext";
function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const { showAlert } = useAlert(); // Add this line
  const [credentials, setCredentails] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(credentials, navigate);
    // try {
    //   showAlert("Login successfully", "success");
    // } catch (error) {
    //   showAlert("Login failed. Please try again.", "danger");
    // }
  };
  const onChange = (e) => {
    setCredentails({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container ">
      <h1 className="text-center mt-2">Login</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            autoComplete="username" // Add this line
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        <div className="form-group form-check"></div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
