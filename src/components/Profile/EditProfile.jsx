import React, { useState } from "react";
import { useAuthContext } from "../../context/auth.context";
import apiClient from "../../services/api-client";
import ButtonSubmit from "../Buttons/ButtonSubmit";

function EditProfile({ user, setUser }) {
  const { storeToken, removeToken } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMessage("");

    apiClient
      .post("/profile/edit-profile", user)
      .then((response) => {
        removeToken();
        storeToken(response.data.authToken);
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
    <article className="profile-card">
      <h2 className="profile-username">Settings</h2>
      <form onSubmit={handleSubmit}>
        Update your profile or change your username.
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
          <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={user.email}
          />
        </label>
        <ButtonSubmit>Save Changes</ButtonSubmit>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </article>
  );
}

export default EditProfile;
