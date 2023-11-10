import React, { useState, useContext } from "react";
// import config from "./config/Config";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/Authentication/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { signup} = authContext;
  const [credentials, setCredentails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit =  (e) => {
    e.preventDefault();
    signup(credentials,navigate)
    // const { name, email, password } = credentials;
    // try {
    //   const response = await fetch(`${config.authUrl}/createuser`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name, email, password }),
    //   });

    //   const json = await response.json();
    //   if (response.status === 200) {
    //     // The server responded with success
    //     localStorage.setItem("token", json.authToken);
    //     navigate("/login"); // Redirect to the login page
    //   } else {
    //     // The server did not respond with success
    //     alert("Invalid credentials");
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
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
          <label htmlFor="exampleInputPassword1">Password</label>
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
