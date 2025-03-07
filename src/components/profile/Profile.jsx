import React, { useEffect, useState } from "react";
import { getProfile, logOut } from "../../services/api";
import UserSettings from "../UserSettings";
import { motion } from "framer-motion";
import { CiLogout } from "react-icons/ci";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");

  function handleNavigation() {}

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      console.log(data);
      setProfileData(data);
    };

    fetchProfile();
  }, []);

  function handleEdit() {
    setEditable(!editable);
  }

  return (
    <div>
      {
        profileData ? (
          <div className="text-white h-screen w-full flex items-center p-6 overflow-hidden">
      {/* SideBar */}

      <div className="relative w-[20%] h-full border-1 border-gray-400 bg-gray-800 p-6">
        {/* Profile view */}

        <div className="w-full flex items-center">
          <div className="bg-gray-400 w-[100px] h-[100px] rounded-full flex justify-center items-center">
            profile
          </div>
          <div>
            <p className="text-center">{profileData.name || "Name"}</p>
            <p className="text-center">{profileData.email}</p>
          </div>
        </div>

        {/* Navigation Section  */}

        <div className="mt-20">
          <ul className="">
            <li
              className="cursor-pointer mb-2"
              onClick={() => setCurrentTab("profile")}
            >
              Profile
            </li>
            <li
              className="cursor-pointer"
              onClick={() => setCurrentTab("settings")}
            >
              Settings
            </li>
          </ul>
        </div>

        <div className="absolute bottom-0 w-full cursor-pointer  flex gap-2 items-center text-xl"
        
            onClick={() => {
              logOut();
              location.reload();
            }}
          >
            <CiLogout /> Log Out
          
        </div>
      </div>

      {/* Main Section */}

      <div className=" w-[80%] h-full">
        {currentTab == "profile" ? (
          <div className="flex justify-center items-center p-6">
            {profileData ? (
              <div className="rounded-3xl p-8 lg:p-12 shadow-2xl w-full h-screen ">
                {editable ? (
                  <UserSettings
                    profileData={profileData}
                    setEditable={setEditable}
                  />
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h1 className="text-4xl font-bold">
                        Welcome, {profileData.name}
                      </h1>
                      <div className="lg:flex md:flex flex-col space-x-2 ">
                        <button
                          onClick={handleEdit}
                          className="bg-blue-600 text-white px-6 py-2 mb-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Edit Profile
                        </button>
                        {/* <button
                          onClick={() => {
                            logOut();
                            location.reload();
                          }}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                          Log Out
                        </button> */}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-700 p-6 rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">
                          Personal Details
                        </h2>
                        <div className="space-y-3">
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {profileData.email}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            {profileData.status}
                          </p>
                          <p>
                            <span className="font-medium">Platform:</span>{" "}
                            {profileData.platform}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-700 p-6 rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">
                          Service Details
                        </h2>
                        <div className="space-y-3">
                          <p>
                            <span className="font-medium">AI Prompt:</span>{" "}
                            {profileData.AiPrompt}
                          </p>
                          <p>
                            <span className="font-medium">Notifications:</span>{" "}
                            {profileData.notifications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-400">Loading profile...</p>
            )}
          </div>
        ) : (
          <div>
            <h1>Settings</h1>
          </div>
        )}
      </div>
    </div>
        ):(
          <p>Loading...</p>
        )
      }
    </div>
  );
};

export default Profile;
