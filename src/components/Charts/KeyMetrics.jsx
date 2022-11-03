import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";

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
    <div>
      <h3>KeyMetrics</h3>
      <ul>
        <li>{checkInCount(moodList)}</li>
        <li>{scoreCount(moodList)}</li>
        <li>{averageMood}</li>
        <li>{moodConversion(averageMood)}</li>
        <li></li>
      </ul>
    </div>
  );
}

export default KeyMetrics;