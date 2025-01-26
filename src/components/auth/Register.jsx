import React, { useState } from "react";
import { registerUser } from "../../services/api";
import HorizontalLinearStepper from "../HorizontalLinearStepper";

const Register = ({ setloginPageSelected }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(name, email, password); // Call the function
      alert("Registration successful!");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="bg-[url(https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen">
      <div className="bg-black/30 backdrop-blur-sm w-full h-screen flex justify-center items-center">
        <div className="bg-red-300">

          <HorizontalLinearStepper/>
          {/* <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <button
            onClick={() => {
              setloginPageSelected(true);
            }}
          >
            login
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
