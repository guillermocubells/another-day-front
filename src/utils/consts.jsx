import smileyAwful from "../assets/image/another-day_smiley-awful.svg";
import smileyBad from "../assets/image/another-day_smiley-bad.svg";
import smileyOkay from "../assets/image/another-day_smiley-okay.svg";
import smileyGood from "../assets/image/another-day_smiley-good.svg";
import smileyGreat from "../assets/image/another-day_smiley-great.svg";

export const MOOD_ASSETS = {
  Awful: {
    image: smileyAwful,
    color: getComputedStyle(document.body).getPropertyValue("--color-awful"),
  },
  Bad: {
    image: smileyBad,
    color: getComputedStyle(document.body).getPropertyValue("--color-bad"),
  },
  Okay: {
    image: smileyOkay,
    color: getComputedStyle(document.body).getPropertyValue("--color-okay"),
  },
  Good: {
    image: smileyGood,
    color: getComputedStyle(document.body).getPropertyValue("--color-good"),
  },
  Great: {
    image: smileyGreat,
    color: getComputedStyle(document.body).getPropertyValue("--color-great"),
  },
};
