import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";
import MoodPageActivities from "../../components/MoodListActivities/MoodListActivities";
import { dateFormat } from "../../utils/date-helper";
import { MOOD_ASSETS } from "../../utils/consts";

import "./MoodPage.css";
import "../../components/MoodCheckInForm/MoodCheckInForm.css";
import "../../components/MoodList/MoodList.css";
import "../../components/MoodListItem/MoodListItem.css";

function MoodPage() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function moveToEditPage() {
    navigate(`/mood/${id}/edit`);
  }

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(`/api/mood/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return;
  }

  const { _id, date, status, substatus, activities, journal } = data;
  const { image } = MOOD_ASSETS[status];

  // console.log(activities);
  return (
    <div className="mood-list-wrapper">
      <div className="mood-list-date">
        <h2>{dateFormat(date)}</h2>
      </div>
      <div
        className="mood-layout"
        style={{
          backgroundColor: MOOD_ASSETS[status].color,
        }}
      >
        <div className="mood-layout-2">
          <div>
            <article key={_id}>
              <div className="mood-layout-2">
                <div
                  className={
                    ("mood-list__item-smiley_wrapper", "smiley-layout")
                  }
                >
                  <img
                    src={image}
                    alt={`${status} smiley`}
                    className="smiley-image"
                  />
                </div>
                <div>
                  <h2>{status}</h2>
                  {substatus && <h3>{substatus[status]}</h3>}
                  {activities && (
                    <h4>
                      {activities.map((activity) => activity.title).join(" ")}
                    </h4>
                  )}
                  {journal && (
                    <article>
                      <h3>Journal</h3>
                      <div>{journal}</div>
                    </article>
                  )}
                </div>
              </div>
            </article>
          </div>
          <div>
            <button
              className="edit-button btn-submit"
              type="button"
              onClick={moveToEditPage}
            >
              Edit
            </button>
          </div>
        </div>

        <div>
          <MoodPageActivities />
        </div>
      </div>
    </div>
  );
}

export default MoodPage;
