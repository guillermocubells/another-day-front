import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import apiClient from "../../services/api-client";

function DeleteUser() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { logOutUser } = useAuthContext();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMessage("");

    apiClient
      .post("/profile/delete-user", form)
      .then((response) => {
        console.log(response);
        logOutUser();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  return (
    <article className="profile-card">
      <h2 className="profile-delete delete">Delete Account</h2>
      <form onSubmit={handleSubmit}>
        Do you want to delete your account? If you’re sure, confirm by logging
        again in below.
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
        </label>
        <button className="submits" type="submit">
          Delete Account
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </article>
  );
}

export default DeleteUser;
