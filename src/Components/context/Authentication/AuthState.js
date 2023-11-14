// AuthState.js
import React from "react";
import config from "../../config/Config";
import AuthContext from "./AuthContext";

export const AuthState = ({ children }) => {
    // ... other authentication-related functions
 
    const signup = async (credentials, navigate) => {
        const{name,email,password} = credentials;
        try {
            const response = await fetch(`${config.authUrl}/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password}),
            });

            const json = await response.json();

            if (response.status === 200) {
                // The server responded with success
                localStorage.setItem("token", json.authToken);
                navigate("/login"); // Redirect to the login page
               
              } else {
                // The server did not respond with success
                alert("Invalid credentials", "danger");

              }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };


// 2 : Login 
    const login = async (credentials, navigate) => {
        try {
            const response = await fetch(`${config.authUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.authToken);
                navigate('/'); // Redirect to the home page
             
            } else {
                alert("Invalid credentials", "danger");

            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ login, signup }}>
            {children}
        </AuthContext.Provider>
    );
};
