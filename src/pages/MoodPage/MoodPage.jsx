import styles from "./MoodPage.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";
import { MOOD_ASSETS } from "../../utils/consts";
import { dateFormat } from "../../utils/date-helper";

import ButtonRegular from "../../components/Buttons/ButtonRegular";
import MoodPageActivities from "../../components/MoodListActivities/MoodListActivities";
import MoodListNotes from "../../components/MoodListNotes/MoodListNotes";
import PillSmall from "../../components/Pills/PillSmall";

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

  const { date, status, substatus, activities, journal, image } = data;
  const { image: smileyImage } = MOOD_ASSETS[status];

  // console.log(activities);
  return (
    <main className={styles.singleMoodPage}>
      <div
        className={styles.singleMoodPageWrapper}
        style={{
          backgroundColor: MOOD_ASSETS[status].color,
        }}
      >
        <div>
          <h1>{dateFormat(date)}</h1>
        </div>

        <article>
          <header>
            <img
              src={smileyImage}
              alt={`${status} smiley`}
              className="smiley-image"
            />
            <h1 className={styles.singleMoodStatus}>{status}</h1>
            {substatus && <h3>{substatus[status]}</h3>}
          </header>
          {activities && (
            <section className={styles.singleMoodActivities}>
              {activities.map((activity) => {
                return (
                  <PillSmall key={activity._id}>{activity.title}</PillSmall>
                );
              })}
            </section>
          )}
          {journal && (
            <section className={styles.singleMoodJournal}>
              <h3>Journal</h3>
              <div>{journal}</div>
            </section>
          )}
        </article>
        {image && (
          <section className={styles.singleMoodImageWrapper}>
            <img className={styles.singleMoodImage} src={image} alt={status} />{" "}
          </section>
        )}

        <ButtonRegular handleClick={moveToEditPage}>Edit</ButtonRegular>

        <MoodPageActivities />

        <MoodListNotes />
      </div>
    </main>
  );
}

export default MoodPage;
