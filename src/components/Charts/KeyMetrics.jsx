import styles from "./KeyMetrics.module.css";

import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import MoodSmiley from "../MoodSmiley/MoodSmiley";

function KeyMetrics({ data }) {
  const [moodList] = useState(data);

  let checkInCount = () => {
    return moodList.length;
  };
  console.log(checkInCount(moodList));

  let scoreCount = () => {
    return moodList
      .map((e) => e.score)
      .reduce((acc, e) => {
        return acc + e;
      });
  };

  let averageMood = (scoreCount(moodList) / checkInCount(moodList)).toFixed(2);

  let moodConversion = () => {
    if (Math.round(averageMood) === 1) {
      return "Awful";
    }
    if (Math.round(averageMood) === 2) {
      return "Bad";
    }
    if (Math.round(averageMood) === 3) {
      return "Okay";
    }
    if (Math.round(averageMood) === 4) {
      return "Good";
    }
    if (Math.round(averageMood) === 5) {
      return "Great";
    }
    return moodConversion;
  };

  console.log(moodConversion(averageMood));

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.keyMetrics}>
      <div>
        <h1>{checkInCount(moodList)}</h1>
        <p>Checkins</p>
      </div>
      <div>
        <h1>{scoreCount(moodList)}</h1>
        <p>Total score</p>
      </div>
      <div>
        <h1>{moodConversion(averageMood)}</h1> <p>Average ({averageMood})</p>
      </div>
      <div>
        <MoodSmiley status={moodConversion(averageMood)} />
      </div>
    </div>
  );
}

export default KeyMetrics;
