import { useState } from "react";
import { FiUser, FiMail, FiEdit2 } from "react-icons/fi";

import { useLMS } from "../context/LMSContext";

const Profile = () => {
  const { user, updateProfile } = useLMS();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    updateProfile(form);
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <div className="page-heading">
        <h1>My Profile</h1>
        <p>Manage your personal information.</p>
      </div>

      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-avatar">
            AK
          </div>

          <h2>{user.name}</h2>
          <p>{user.role}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-form-heading">
            <h3>Personal Information</h3>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditing(!editing)}
            >
              <FiEdit2 /> {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <label>Full Name</label>
          <div className="input-with-icon">
            <FiUser />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>

          <label>Email Address</label>
          <div className="input-with-icon">
            <FiMail />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>

          <label>About Me</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            disabled={!editing}
            rows="4"
          />

          <label>Member Since</label>
          <input value={user.joined} disabled />

          {editing && (
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;