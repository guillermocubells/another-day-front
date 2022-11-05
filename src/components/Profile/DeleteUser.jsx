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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
        </label>
        <br />
        <br />
        <button className="submits" type="submit">
          Delete Account
        </button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default DeleteUser;
