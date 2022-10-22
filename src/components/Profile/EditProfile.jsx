import React, { useState } from "react";
import apiClient from "../../services/api-client";

function EditProfile({ user, setUser }) {
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    apiClient
      .post("/profile/edit-profile", user)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={user.name}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={user.email}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default EditProfile;
