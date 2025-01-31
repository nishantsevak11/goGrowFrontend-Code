import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser} from '../../services/api'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [serviceQuestions, setServiceQuestions] = useState({
    platform: '',
    categories: '',
    AiPrompt: '',
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'name':
        if (!value) errorMsg = 'Name is required';
        else if (value.length < 3)
          errorMsg = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value) errorMsg = 'Email is required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          errorMsg = 'Invalid email format';
        break;
      case 'password':
        if (!value) errorMsg = 'Password is required';
        else if (value.length < 6)
          errorMsg = 'Password must be at least 6 characters';
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(personalInfo).forEach((key) => {
      newErrors[key] = validateField(key, personalInfo[key]);
    });
    Object.keys(serviceQuestions).forEach((key) => {
      newErrors[key] = validateField(key, serviceQuestions[key]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please correct the errors before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    try {
      console.log(personalInfo.name, personalInfo.email, personalInfo.password, serviceQuestions.AiPrompt);
      setIsLoading(true);
      const response = await registerUser(
        personalInfo.name,
        personalInfo.email,
        personalInfo.password,
        serviceQuestions.platform,
        serviceQuestions.categories,
        serviceQuestions.AiPrompt
      );
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/profile";
      }, 3000);
    
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An unexpected error occurred!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleServiceQuestionsChange = (e) => {
    const { name, value } = e.target;
    setServiceQuestions({ ...serviceQuestions, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  return (
    <div className="w-full h-full bg-gray-800 text-white">
      <div className="w-full max-w-4xl mx-auto p-6">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="space-y-4">
          <input
            className="w-full p-3 bg-gray-700 text-white rounded"
            name="name"
            value={personalInfo.name}
            onChange={handlePersonalInfoChange}
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <input
            className="w-full p-3 bg-gray-700 text-white rounded"
            name="email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            className="w-full p-3 bg-gray-700 text-white rounded"
            type="password"
            name="password"
            value={personalInfo.password}
            onChange={handlePersonalInfoChange}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

         

          <textarea
            className="w-full p-3 bg-gray-700 text-white rounded"
            name="AiPrompt"
            value={serviceQuestions.AiPrompt}
            onChange={handleServiceQuestionsChange}
            placeholder="Add AI prompt"
          />
          {errors.AiPrompt && <p className="text-red-500">{errors.AiPrompt}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 py-2 px-4 rounded w-full"
        >
          {
            isLoading ? "loading....." : "Register"
          }
        </button>
      </div>

      {/* ToastContainer is required to show toast messages */}
      <ToastContainer />
    </div>
  );
}
