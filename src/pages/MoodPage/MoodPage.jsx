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
import DeleteButton from "../../components/DeleteButton/DeleteButton";

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

  const { _id, date, status, substatus, activities, journal, image } = data;
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
        <section className={styles.singleMoodPageInfos}>
          <div>
            <header className={styles.header}>
              <div>
                <h3>{dateFormat(date)}</h3>
                <h1 className={styles.singleMoodStatus}>{status}</h1>
                {substatus && <h3>{substatus[status]}</h3>}
              </div>
              <img
                src={smileyImage}
                alt={`${status} smiley`}
                className="smiley-image"
              />
            </header>
            {activities && (
              <article className={styles.singleMoodActivities}>
                {activities.map((activity) => {
                  return (
                    <PillSmall key={activity._id} nofill={true}>
                      {activity.title}
                    </PillSmall>
                  );
                })}
              </article>
            )}
          </div>
          <div>
            {image && (
              <article className={styles.singleMoodImageWrapper}>
                <img
                  className={styles.singleMoodImage}
                  src={image}
                  alt={status}
                />{" "}
              </article>
            )}
          </div>
        </section>
        {journal && (
          <section className={styles.singleMoodJournal}>
            <h3>Journal</h3>
            <div>{journal}</div>
          </section>
        )}
        <MoodPageActivities />
        <hr />
        <MoodListNotes id={_id} />
        <hr />
        <footer className={styles.footer}>
          <ButtonRegular handleClick={moveToEditPage}>Edit</ButtonRegular>
          <DeleteButton id={_id} />
        </footer>
      </div>
    </main>
  );
}

export default MoodPage;
