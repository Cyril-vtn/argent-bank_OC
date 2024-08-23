// api.service.js
const BASE_URL = "http://localhost:3001/api/v1";

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 400) {
      throw new Error("Invalid username or password. Please try again.");
    }

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};

export const updateUserProfile = async (token, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
