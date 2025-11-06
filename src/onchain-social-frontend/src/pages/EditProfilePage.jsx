import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";

function EditProfilePage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    const existingProfile = JSON.parse(localStorage.getItem("profile")) || {};

    const updatedProfile = {
      username: username || existingProfile.username || "you",
      avatar: avatar || existingProfile.avatar || "https://i.pravatar.cc/40?img=1",
      bio: bio || existingProfile.bio || "",
    };

    localStorage.setItem("profile", JSON.stringify(updatedProfile));

    // ✅ Redirect directly to FeedPage after saving
    navigate("/feed");
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-container">
        <h2>Edit Your Profile</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Avatar URL</label>
        <input
          type="text"
          placeholder="Paste avatar image link"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <label>Bio</label>
        <textarea
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}

export default EditProfilePage;
