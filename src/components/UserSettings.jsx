import React, { useState } from "react";
import { updateProfile } from "../services/api";

function UserSettings({ profileData, setEditable }) {
  const [formData, setFormData] = useState(profileData); // Initialize form data with props

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update state based on input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(formData); // Call the update API function
      alert("Profile updated successfully!");
      setEditable(false); // Exit edit mode
    } catch (error) {
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 p-4">
      <h1 className="text-white text-lg font-bold mb-4">Edit User Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-400 block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-400 block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label htmlFor="status" className="text-gray-400 block mb-1">
            Status:
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* Platform Field */}
        <div className="mb-4">
          <label htmlFor="platform" className="text-gray-400 block mb-1">
            Platform:
          </label>
          <input
            type="text"
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* Categories Field */}
        <div className="mb-4">
          <label htmlFor="categories" className="text-gray-400 block mb-1">
            Categories:
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* Send Time Field */}
        <div className="mb-4">
          <label htmlFor="sendTime" className="text-gray-400 block mb-1">
            Send Time:
          </label>
          <input
            type="text"
            id="sendTime"
            name="sendTime"
            value={formData.sendTime}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        {/* AI Prompt Field */}
        <div className="mb-4">
          <label htmlFor="AiPrompt" className="text-gray-400 block mb-1">
            AI Prompt:
          </label>
          <input
            type="text"
            id="AiPrompt"
            name="AiPrompt"
            value={formData.AiPrompt}
            onChange={handleInputChange}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UserSettings;
