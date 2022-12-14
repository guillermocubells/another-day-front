import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import apiClient from "../../services/api-client";
import ButtonSubmit from "../Buttons/ButtonSubmit";

function ChangePassword() {
  const navigate = useNavigate();
  const { storeToken, removeToken, authenticateUser } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setPasswords({ ...passwords, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMessage("");

    apiClient
      .post("/profile/change-password", passwords)
      .then((res) => {
        removeToken();
        storeToken(res.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      })
      .finally(
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      );
  }

  return (
    <article className="profile-card">
      <h2 className="profile-password">Password</h2>
      <form onSubmit={handleSubmit}>
        Change your password...
        <label>
          Old Password
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}
            value={passwords.oldPassword}
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={passwords.newPassword}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={passwords.confirmPassword}
          />
        </label>
        <ButtonSubmit>Change Password</ButtonSubmit>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </article>
  );
}

export default ChangePassword;
