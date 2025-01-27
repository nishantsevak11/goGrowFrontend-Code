import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      window.location.href = '/profile';
    } catch (error) {
      alert('Login failed!');
      console.log(error);
    }
  };

  return (
    <div className="bg-[url(https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen">
      <div className="bg-black/30 backdrop-blur-sm w-full h-screen flex justify-center items-center">
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mb-4 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => {
            window.location.href = '/register'; 
          }} 
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
