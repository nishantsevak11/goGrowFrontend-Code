import React, { useEffect, useState } from "react";
import { getProfile, logOut } from "../../services/api";
import UserSettings from "../UserSettings";
import { motion } from "framer-motion";
import { CiLogout } from "react-icons/ci";
import { FaUser, FaCog } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logOut();
    window.location.reload();
  };

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          {/* Sidebar */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="md:w-64 bg-gray-800 p-6 flex-shrink-0 border-r border-gray-700"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
                  {profileData?.name?.charAt(0) || "U"}
                </div>
              </div>

              <nav className="flex-1">
                <ul className="space-y-2">
                  {[
                    { id: "profile", label: "Profile", icon: FaUser },
                    { id: "settings", label: "Settings", icon: FaCog },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setCurrentTab(item.id)}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                          currentTab === item.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <item.icon className="mr-3" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <button
                onClick={handleLogout}
                className="flex items-center p-3 mt-auto text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <CiLogout className="mr-3" />
                Log Out
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-6 md:p-8 overflow-y-auto"
          >
            {currentTab === "profile" ? (
              <div className="max-w-4xl mx-auto">
                {editable ? (
                  <UserSettings
                    profileData={profileData}
                    setEditable={setEditable}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Welcome, {profileData?.name || "User"}
                      </h1>
                      <button
                        onClick={() => setEditable(true)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProfileCard
                        title="Personal Details"
                        data={[
                          { label: "Email", value: profileData?.email },
                          { label: "Status", value: profileData?.status },
                          { label: "Platform", value: profileData?.platform },
                        ]}
                      />
                      <ProfileCard
                        title="Service Details"
                        data={[
                          { label: "AI Prompt", value: profileData?.AiPrompt },
                          {
                            label: "Notifications",
                            value: profileData?.notifications,
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>
                {/* Add settings content here */}
              </div>
            )}
          </motion.main>
        </div>
      )}
    </div>
  );
};

// Reusable Profile Card Component
const ProfileCard = ({ title, data }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-xl font-semibold mb-4 text-blue-400">{title}</h2>
    <div className="space-y-3">
      {data.map((item) => (
        <p key={item.label} className="text-gray-300">
          <span className="font-medium text-white">{item.label}:</span>{" "}
          {item.value || "Not specified"}
        </p>
      ))}
    </div>
  </div>
);

export default Profile;