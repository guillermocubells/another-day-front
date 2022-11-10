import "./MoodListItem.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MOOD_ASSETS } from "../../utils/consts";
import PillSmall from "../Pills/PillSmall";

function MoodListItem({ mood }) {
  const navigate = useNavigate();
  const { date, status, _id, activities } = mood;
  const newDate = new Date(date);
  const { image, color } = MOOD_ASSETS[status];

  return (
    <div
      className="mood-list__item"
      onClick={() => navigate(`/mood/${_id}`)}
      style={{ backgroundColor: color }}
    >
      <div className="mood-list__item-smiley_wrapper">
        <img src={image} alt={`${status} smiley`} className="smiley-image" />
      </div>

      <div className="mood-list__item-info_wrapper">
        <h3 className="mood-list__item__status">
          {status}{" "}
          <span className="mood-list__item__date">
            {newDate.toLocaleTimeString("es-es", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </h3>

        <div className="mood-list__item__activities">
          {activities.map((activity) => {
            return (
              <PillSmall
                content={activity.title}
                key={activity._id}
                nofill={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoodListItem;
