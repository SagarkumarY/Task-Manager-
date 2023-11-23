// AuthState.js
import React from "react";
import config from "../../config/Config";
import AuthContext from "./AuthContext";
import { useAlert } from "../AlertContext";

export const AuthState = ({ children }) => {
    const { showAlert } = useAlert(); // Add this line
    // ... other authentication-related functions

    const signup = async (credentials, navigate) => {
        const { name, email, password } = credentials;
        try {
            const response = await fetch(`${config.authUrl}/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();

            if (response.status === 200) {
                // The server responded with success
                localStorage.setItem("token", json.authToken);
                navigate("/"); // Redirect to the login page
                showAlert("Signup successfully", "success");

            } else {
                // The server did not respond with success
                console.log("Invalid credentials", "danger");
                showAlert(" Invalid credentials. Please try again.", "danger");

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
                console.log('Before navigating to the home page');
                navigate('/');
                console.log('After navigating to the home page');
                showAlert("Login successfully", "success");


            } else {
                showAlert("Login failed. Please try again.", "danger");

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
