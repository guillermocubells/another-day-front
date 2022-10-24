import React from "react";
import { useNavigate } from "react-router-dom";

function MoodListItem({ mood }) {
  const { date, status, _id } = mood;
  const navigate = useNavigate();

  return (
    <article onClick={() => navigate(`/mood/${_id}`)}>
      <div>{date}</div>
      <div>{status}</div>
    </article>
  );
}

export default MoodListItem;
