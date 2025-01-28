import React, { useEffect, useState } from "react";
import { getProfile, logOut } from "../../services/api";
import UserSettings from "../UserSettings";

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
    <div className="min-h-screen bg-black text-white flex justify-center py-10">
      {profileData ? (
        <div className="bg-gray-900 rounded-2xl p-6 lg:px-10 shadow-lg max-w-[90%] max-h-[90vh] w-full">
          {editable ? (
            <UserSettings profileData={profileData} setEditable={setEditable} />
          ) : (
            <div>
              <h4 className="text-2xl lg:text-4xl font-bold mb-10">Welcome, {profileData.name}</h4>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
                <p className="mb-1">
                  <span className="font-medium">Email:</span> {profileData.email}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Email Service:</span> {profileData.status}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Platform:</span> {profileData.platform}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Email Sending Time:</span> {profileData.sendTime}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Service Details</h3>
                <p className="mb-1">
                  <span className="font-medium">Message for AI:</span> {profileData.AiPrompt}
                </p>
                <p>
                  <span className="font-medium">Notification Sends:</span> {profileData.notifications}
                </p>
              </div>

              <button
                onClick={handleEdit}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Edit
              </button>

              <button
                 onClick={logOut}
                 className="bg-red-600 text-white mx-10 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                  logOut
              </button>

            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
