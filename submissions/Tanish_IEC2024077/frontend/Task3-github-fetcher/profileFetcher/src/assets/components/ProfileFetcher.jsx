import React, { useState } from "react";

function ProfileFetcher() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    if (username.trim() === "") return;

    setLoading(true);
    setError(null);
    setProfileData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center px-4 py-6">
      
      <h1 className="text-white font-bold text-3xl sm:text-4xl text-center mb-6">
        GitHub Profile Fetcher
      </h1>

      
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 w-full sm:w-auto bg-white text-black px-4 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleFetchData}
          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer transition-all text-white px-6 py-2 rounded w-full sm:w-auto"
        >
          Fetch Profile
        </button>
      </div>

      
      {loading && <p className="text-white mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      
      {profileData && (
        <div className="mt-8 bg-gray-800 text-white rounded-lg p-6 flex flex-col items-center w-full max-w-sm sm:max-w-md shadow-lg">
          <img
            src={profileData.avatar_url}
            alt={profileData.login}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-4 border-4 border-gray-700"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {profileData.name || profileData.login}
          </h2>
          <p className="text-gray-300 mb-2 text-center px-2">
            {profileData.bio || "No bio available"}
          </p>
          <p className="font-semibold">Repos: {profileData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileFetcher;
