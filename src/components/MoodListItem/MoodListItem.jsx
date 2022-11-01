import React from "react";
import { useNavigate } from "react-router-dom";

function MoodListItem({ mood }) {
  const { date, status, _id, activities } = mood;
  const newDate = new Date(date);
  const navigate = useNavigate();

  return (
    <article
      className={`mood-list__item ${status.toLowerCase()}`}
      onClick={() => navigate(`/mood/${_id}`)}
    >
      <div className="mood-list__item__date">
        {newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <h2 className="mood-list__item__status">{status}</h2>
      <div className="mood-list__item__activities">
        {activities.map((activity) => {
          return (
            <div className="mood-list__item__activity" key={activity._id}>
              {activity.title}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default MoodListItem;
