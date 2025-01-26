import React, { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setloginPageSelected }) => {
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
      navigate('/profile');
    } catch (error) {
      alert('Login failed!');
      console.log(error);
    }
  };

  return (
    <div className="text-white">
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
        onClick={() => setloginPageSelected(false)}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Login;