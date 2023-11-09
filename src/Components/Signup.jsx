import React from "react";

export default function Signup() {
  return (
    <div className="container">
      <h1 className="text-center mt-2 ">Signup</h1>
      <form className="signup_form">
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
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
          />
        </div>

        <button type="submit" className="btn mt-2 btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
