// import { useContext } from "react";
import React from "react";
// import taskContext from "./context/TaskContext";

function About() {


  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <h2 className="mb-4">About Us</h2>
     
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            nulla vitae lorem posuere, et euismod mi scelerisque. Phasellus non
            lacus id orci rhoncus euismod. Sed in odio ut ligula tincidunt
            ullamcorper.
          </p>
          <p>
            Nunc vel dolor eget arcu auctor tristique. Quisque quis nisl a
            libero commodo viverra vel non risus. Nullam laoreet, mi eget
            pharetra imperdiet, ex mi blandit libero, sit amet luctus metus
            libero vel nunc. Fusce quis nisl a libero commodo viverra vel non
            risus.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyR0iCjHd9AlnLr0zTZtuhDV_AUdJcqOPMig&usqp=CAU"
            alt="About Us"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
