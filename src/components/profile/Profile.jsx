import React, { useEffect, useState } from "react";
import { getProfile, logOut } from "../../services/api";
import UserSettings from "../UserSettings";
import { motion } from "framer-motion";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfileData(data);
    };

    fetchProfile();
  }, []);

  function handleEdit() {
    setEditable(!editable);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex justify-center items-center p-6"
    >
      {profileData ? (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl w-full max-w-4xl"
        >
          {editable ? (
            <UserSettings profileData={profileData} setEditable={setEditable} />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Welcome, {profileData.name}</h1>
                <div className="lg:flex md:flex flex-col space-x-2 ">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-600 text-white px-6 py-2 mb-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={()=> {
                      logOut();
                      location.reload();
                    }}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Log Out
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-700 p-6 rounded-2xl">
                  <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
                  <div className="space-y-3">
                    <p><span className="font-medium">Email:</span> {profileData.email}</p>
                    <p><span className="font-medium">Status:</span> {profileData.status}</p>
                    <p><span className="font-medium">Platform:</span> {profileData.platform}</p>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-2xl">
                  <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
                  <div className="space-y-3">
                    <p><span className="font-medium">AI Prompt:</span> {profileData.AiPrompt}</p>
                    <p><span className="font-medium">Notifications:</span> {profileData.notifications}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400">Loading profile...</p>
      )}
    </motion.div>
  );
};

export default Profile;