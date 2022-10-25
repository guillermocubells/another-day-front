import React from "react";
import { useNavigate } from "react-router-dom";

function MoodListItem({ mood }) {
  const { date, status, _id, activities } = mood;
  const newDate = new Date(date);
  const navigate = useNavigate();

  return (
    <article onClick={() => navigate(`/mood/${_id}`)}>
      <div>
        {newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div>{status}</div>
      {activities && <div> {activities}</div>}
    </article>
  );
}

export default MoodListItem;
