import React from "react";
import "./MarketingPage.css";
import banner from "../../assets/image/another-homepage-banner.svg";
import checkInWithYourself from "../../assets/image/checkin-with-yourself.svg";
import monitorYourMoods from "../../assets/image/monitor-your moods.svg";
import pinpointWhatDrawnsYou from "../../assets/image/pinpoint-what-drawns-you.svg";
import tagYourNotes from "../../assets/image/tag-your-notes.svg";

function MarketingPage() {
  return (
    <div>
      <div className="marketing-layout">
        <div>
          <br />
          <br />
          <br />
          <br />
          <h1>
            Daily moodcheck <br />
            for just a $
          </h1>
          <br />
          <h3>
            Some say the more you pay <br />
            the better you stay
          </h3>
          <div>
            <button>Checkin</button>
          </div>
        </div>
        <div>
          <img src={banner} alt="banner" />
        </div>
      </div>

      <div className="hero-background">
        <h3 style={{ margin: "0 auto" }}>How it works</h3>
        <br />
        <h4>
          From checkin to action, track how you feel and own your state of mind
        </h4>
        <br />
        <br />
        <br />

        <div className="marketing-layout ">
          <div className="hero">
            <img src={checkInWithYourself} alt="checkin" />
            <h4>Checkin with yourself</h4>
            <br />
            <h5>In less than a 1 minute everyday</h5>
          </div>
          <div className="hero">
            <img src={tagYourNotes} alt="tag your notes" />
            <h4>Monitor your moods</h4>
            <br />
            <h5>Look into your expansive and recessive cycles</h5>
          </div>
          <div className="hero">
            <img src={monitorYourMoods} alt="monitor your moods" />
            <h4>Tag your notes</h4>
            <br />
            <h5>And start creating your digital archive</h5>
          </div>
          <div className="hero">
            <img src={pinpointWhatDrawnsYou} alt="pinpoint what draws you" />
            <h4>Know what drawns you</h4>
            <br />
            <h5>And stop downward spirals</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingPage;
