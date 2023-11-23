import React, { useState, useContext } from "react";
// import config from "./config/Config";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/Authentication/AuthContext";
import  {useAlert} from "./context/AlertContext"

export default function Signup() {
  const navigation = useNavigate();
  const authContext = useContext(AuthContext);
  const { signup} = authContext;
  const { showAlert } = useAlert(); // Add this line
  const [credentials, setCredentails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // signup(credentials,navigate)
    try {
      // Call the signup function from AuthContext
      await signup(credentials, navigation);

      // On success
      showAlert("Signup successful!", "success");
    } catch (error) {
      console.error("An error occurred during signup:", error);
      // On error
      showAlert("Signup failed. Please try again.", "danger");
    }
 
  };

  const onChange = (e) => {
    setCredentails({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h1 className="text-center mt-2 ">Signup</h1>
      <form className="signup_form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn mt-2 btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}
