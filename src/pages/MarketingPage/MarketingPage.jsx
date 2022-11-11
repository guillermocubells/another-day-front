import React from "react";
import { useNavigate } from "react-router-dom";
import "./MarketingPage.css";
import banner from "../../assets/image/another-homepage-banner.svg";
import checkInWithYourself from "../../assets/image/checkin-with-yourself.svg";
import monitorYourMoods from "../../assets/image/monitor-your moods.svg";
import pinpointWhatDrawnsYou from "../../assets/image/pinpoint-what-drawns-you.svg";
import tagYourNotes from "../../assets/image/tag-your-notes.svg";

function MarketingPage() {
  const navigate = useNavigate();

  return (
    <main className="marketingPage">
      <div className="hero-layout">
        <div className="hero-text">
          <h1>
            Daily moodcheck <br />
            for just a $
          </h1>

          <h3>
            Some say the more you pay <br />
            the better you stay
          </h3>
          <div>
            <button
              onClick={() => {
                navigate(`/signup`);
              }}
              className="cta"
            >
              Check In
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={banner} alt="banner" />
        </div>
      </div>

      <div className="marketing-background">
        <h3>How it works</h3>
        <p>
          From check-in to action, track how you feel and own your state of mind
        </p>

        <section className="marketing-layout">
          <article className="hero">
            <img src={checkInWithYourself} alt="checkin" />
            <h4>Check-In with yourself</h4>
            <p>In less than a 1 minute everyday.</p>
          </article>
          <article className="hero">
            <img src={tagYourNotes} alt="tag your notes" />
            <h4>Monitor your moods</h4>
            <p>Look into your expansive and recessive cycles.</p>
          </article>
          <article className="hero">
            <img src={monitorYourMoods} alt="monitor your moods" />
            <h4>Write notes</h4>
            <p>And start creating your digital archive.</p>
          </article>
          <article className="hero">
            <img src={pinpointWhatDrawnsYou} alt="pinpoint what draws you" />
            <h4>Know what drowns you</h4>
            <p>And stop downward spirals.</p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default MarketingPage;
