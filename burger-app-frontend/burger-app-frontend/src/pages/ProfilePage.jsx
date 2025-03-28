import React from "react";
import useAuth from "../context/AuthContext"; // Get auth context

const ProfilePage = () => {
  const { user, logout } = useAuth(); // Access user data & logout function

  if (!user) {
    return <p>Loading profile...</p>; // Handle loading state
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button
        onClick={logout}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;

