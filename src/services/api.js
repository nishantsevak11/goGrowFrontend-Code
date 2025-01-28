import axios from "axios";

// Base URL for your backend
const API_URL = "https://gogrowproject.onrender.com/auth";


// Register a new user
export const registerUser = (
  name,
  email,
  password,
  sendTime,
  platform,
  categories,
  AiPrompt
) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    sendTime,
    platform,
    categories,
    AiPrompt,
  });
};

// Login a user
export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const isLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};

export const logOut = ()=>{
  localStorage.removeItem('token');
}

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/profile`,
      { ...profileData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the updated profile data or a success message
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw new Error("Could not update the profile");
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
