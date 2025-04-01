import React, { useState, useCallback } from "react";
import { updateProfile } from "../services/api";
import { motion } from "framer-motion";

const UserSettings = ({ profileData, setEditable }) => {
  const [formData, setFormData] = useState(profileData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Field configuration excluding __id
  const fieldConfig = {
    name: { label: "Name", type: "text", required: true },
    email: { label: "Email", type: "email", required: true },
    status: { label: "Status", type: "text" },
    platform: { label: "Platform", type: "text" },
    AiPrompt: { label: "AI Prompt", type: "text" },
    notifications: { 
      label: "Notifications", 
      type: "select", 
      options: ["enabled", "disabled"]
    }
  };

  const validateField = (name, value) => {
    if (fieldConfig[name]?.required && !value) {
      return `${fieldConfig[name].label} is required`;
    }
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields before submission
    const newErrors = {};
    Object.keys(fieldConfig).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Ensure __id is preserved but not modified
      const submitData = {
        ...formData,
        __id: profileData.__id // Preserve original __id
      };
      await updateProfile(submitData);
      setEditable(false);
      window.alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      window.alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Edit Profile
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fieldConfig)
            .filter(([key]) => key !== "__id") // Explicitly exclude __id
            .map(([key, config]) => (
              <motion.div key={key} variants={itemVariants} className="space-y-2">
                <label 
                  htmlFor={key} 
                  className="block text-sm font-medium text-gray-300"
                >
                  {config.label}
                  {config.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                
                {config.type === "select" ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <option value="">Select an option</option>
                    {config.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={config.type}
                    id={key}
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                )}
                
                {errors[key] && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm"
                  >
                    {errors[key]}
                  </motion.p>
                )}
              </motion.div>
            ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-end space-x-4 pt-4"
        >
          <button
            type="button"
            onClick={() => setEditable(false)}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            Save Changes
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UserSettings;