import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useMediaQuery } from "react-responsive";
import TimePicker from "react-time-picker"; // Importing the improved time picker
import "react-time-picker/dist/TimePicker.css"; // Import the CSS for the time picker
import "react-clock/dist/Clock.css"; // Import the CSS for the clock

const steps = ["Personal Information", "Service Questions"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [serviceQuestions, setServiceQuestions] = useState({
    sendTime: "", // Time will be stored here
    platform: "",
    categories: "",
    AiPrompt: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "name":
        if (!value) errorMsg = "Name is required";
        else if (value.length < 3)
          errorMsg = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value) errorMsg = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          errorMsg = "Invalid email format";
        break;
      case "password":
        if (!value) errorMsg = "Password is required";
        else if (value.length < 6)
          errorMsg = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    const newErrors = {};
    Object.keys(personalInfo).forEach((key) => {
      const errorMsg = validateField(key, personalInfo[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSubmit = async () => {
    try {
      // Simulate your registration function here
      const response = await registerUser(
        personalInfo.name,
        personalInfo.email,
        personalInfo.password,
        serviceQuestions.sendTime,
        serviceQuestions.platform,
        serviceQuestions.categories,
        serviceQuestions.AiPrompt
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      alert("Register successful!");
      window.location.href = "/profile";
      alert("Register successful!");
    } catch (error) {
      alert("Register failed!");
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
  };

  const handleTimeChange = (time) => {
    setServiceQuestions({ ...serviceQuestions, sendTime: time });
  };

  // Media query for responsive design
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="w-full h-full bg-gray-800 text-white">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex justify-between mb-4">
          {steps.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`step ${
                  activeStep === index ? "text-blue-400" : ""
                }`}
              >
                {label}
              </div>
              {activeStep === index && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        {activeStep === steps.length ? (
          <div>
            <h2 className="text-2xl">Thank you, {personalInfo.name}!</h2>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-600 py-2 px-4 rounded"
            >
              Finish
            </button>
          </div>
        ) : (
          <div>
            {activeStep === 0 && (
              <div className="space-y-4">
                <input
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  placeholder="Name"
                />
                <input
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder="Email"
                />
                <input
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  type="password"
                  name="password"
                  value={personalInfo.password}
                  onChange={handlePersonalInfoChange}
                  placeholder="Password"
                />
              </div>
            )}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm ">
                    Preferred Time (AM/PM)
                  </label>
                  <TimePicker
                    value={serviceQuestions.sendTime}
                    onChange={handleTimeChange}
                    className="w-full p-3 bg-gray-700 text-white rounded"
                    format="h:mm a" 
                    clearIcon={null} 
                    clockIcon={null}
                  />
                </div>
                <input
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  name="platform"
                  value={serviceQuestions.platform}
                  onChange={handleServiceQuestionsChange}
                  placeholder="Platform (Coming Soon)"
                  disabled
                />
                <input
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  name="categories"
                  value={serviceQuestions.categories}
                  onChange={handleServiceQuestionsChange}
                  placeholder="Categories (Coming Soon)"
                  disabled
                />
                <textarea
                  className="w-full p-3 bg-gray-700 text-white rounded"
                  name="AiPrompt"
                  value={serviceQuestions.AiPrompt}
                  onChange={handleServiceQuestionsChange}
                  placeholder="Add AI prompt"
                />
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-600 text-white py-2 px-4 rounded"
                disabled={activeStep === 0}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
