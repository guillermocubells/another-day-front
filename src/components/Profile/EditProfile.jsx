import React, { useState } from "react";
import { useAuthContext } from "../../context/auth.context";
import apiClient from "../../services/api-client";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={user.name}
          />
        </label>
        <br />
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
        <br />
        <br />
        <button className="submits" type="submit">
          Save Changes
        </button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default EditProfile;
