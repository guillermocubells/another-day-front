import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";
import MoodPageActivities from "../../components/MoodListActivities/MoodListActivities";
import { dateFormat } from "../../utils/date-helper";
import "./MoodPage.css";
import "../../components/MoodCheckInForm/MoodCheckInForm.css";

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
  // console.log(activities);
  return (
    <div>
      <div className="mood-layout">
        <div>
          <div className="layout">
            <article key={_id}>
              <div>
                <h5 className="italics">{dateFormat(date)}</h5>
              </div>
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
              {/* <image /> */}
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
