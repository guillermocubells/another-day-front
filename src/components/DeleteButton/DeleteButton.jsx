import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import ButtonRegular from "../Buttons/ButtonRegular";

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
    <>
      <ButtonRegular handleClick={handleClick}>Delete Entry</ButtonRegular>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
}

export default DeleteButton;
