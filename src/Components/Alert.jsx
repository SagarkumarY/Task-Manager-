import React from "react";
import { useAlert } from "./context/AlertContext";

function Alert() {
  const { alert } = useAlert();
  return (
    <div style={{height:"30px"}}>
      {alert && (
        <div className={`alert alert-${alert.type}`}  role="alert">
          <strong>{alert.type}</strong> {alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
