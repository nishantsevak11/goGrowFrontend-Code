import React, { useState } from "react";
import { updateProfile } from "../services/api";
import { motion } from "framer-motion";

function UserSettings({ profileData, setEditable }) {
  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(formData);
      alert("Profile updated successfully!");
      setEditable(false);
    } catch (error) {
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(profileData).map((key) => (
            <div key={key} className="space-y-2">
              <label htmlFor={key} className="text-gray-300 block capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setEditable(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default UserSettings;