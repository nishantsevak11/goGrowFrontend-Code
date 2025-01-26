import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import UserSettings from "../UserSettings";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfileData(data);
      console.log(data);
    };

    fetchProfile();
  }, []);

  function handleEdit() {
    setEditable(!editable);
  }

  return (
    <div>
      {profileData ? (
        <div>
          {
            editable ? (
              <UserSettings profileData={profileData} setEditable={setEditable}/>
              
            ):(
                <div className="text-white">
              <h1>Welcome {profileData.name}</h1>
  
              <div>
                <h3>Personal Details</h3>
                <p>Email {profileData.email}</p>
                <p>Email {profileData.status}</p>
                <p>Email {profileData.platform}</p>
                <p>Email {profileData.sendTime}</p>
              </div>
  
              <div>
                <h3>Service Information</h3>
                <p>Message for AI {profileData.AiPrompt}</p>
              </div>
  
              <button onClick={handleEdit} className="bg-red-600">
                Edit
              </button>
            </div>
            )
          }
          
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
