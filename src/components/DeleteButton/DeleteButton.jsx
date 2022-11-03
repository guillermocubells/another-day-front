import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";

function DeleteButton({ id }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    apiClient
      .get(`/api/mood/${id}/delete`)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }
  return (
    <button type="button" onClick={handleClick}>
      Delete Entry
    </button>
  );
}

export default DeleteButton;
