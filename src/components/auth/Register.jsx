import React, { useState } from "react";
import { registerUser } from "../../services/api";
import HorizontalLinearStepper from "../HorizontalLinearStepper";

const Register = () => {
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
    <div className=" w-full h-screen">
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-full h-full py-[5%] px-[10%]">

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
          */}
          <button
          className="text-white bg-red-700 px-10 py-5"
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            login
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Register;
