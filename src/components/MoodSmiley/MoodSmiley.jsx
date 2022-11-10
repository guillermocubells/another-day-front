import smileyAwful from "../../assets/image/another-day_smiley-awful.svg";
import smileyBad from "../../assets/image/another-day_smiley-bad.svg";
import smileyOkay from "../../assets/image/another-day_smiley-okay.svg";
import smileyGood from "../../assets/image/another-day_smiley-good.svg";
import smileyGreat from "../../assets/image/another-day_smiley-great.svg";
import React from "react";

function MoodSmiley({ status }) {
  const moodSmileys = {
    Awful: { image: smileyAwful },
    Bad: { image: smileyBad },
    Okay: { image: smileyOkay },
    Good: { image: smileyGood },
    Great: { image: smileyGreat },
  };

  return (
    <img
      src={moodSmileys[status].image}
      alt={`${status} smiley`}
      className="smiley-image"
    />
  );
}

export default MoodSmiley;
