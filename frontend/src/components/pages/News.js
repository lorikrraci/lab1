import React, { useState } from "react";
import "./news.css";

const News = () => {
  const [activeTab, setActiveTab] = useState("NEW");

  const newsData = {
    NEW: [
      {
        img: "/path/to/image1.jpg",
        title: "Bauza: Higuain and Messi will start against Brazil",
        date: "25 SEP 2016 BY LOGAN HOLMES",
        description: "Snackwave tote bag fixie gluten-free...",
      },
      {
        img: "/path/to/image2.jpg",
        title: "When somersaulting Sanchez shouldered Mexico’s hopes",
        date: "25 SEP 2016 BY CODY LARKINS",
        description: "Activated charcoal trust fund ugh prism af...",
      },
      {
        img: "/path/to/image2.jpg",
        title: "When somersaulting Sanchez shouldered Mexico’s hopes",
        date: "25 SEP 2016 BY CODY LARKINS",
        description: "Activated charcoal trust fund ugh prism af...",
      },
      {
        img: "/path/to/image2.jpg",
        title: "When somersaulting Sanchez shouldered Mexico’s hopes",
        date: "25 SEP 2016 BY CODY LARKINS",
        description: "Activated charcoal trust fund ugh prism af...",
      },
      {
        img: "/path/to/image2.jpg",
        title: "When somersaulting Sanchez shouldered Mexico’s hopes",
        date: "25 SEP 2016 BY CODY LARKINS",
        description: "Activated charcoal trust fund ugh prism af...",
      },
      {
        img: "/path/to/image2.jpg",
        title: "When somersaulting Sanchez shouldered Mexico’s hopes",
        date: "25 SEP 2016 BY CODY LARKINS",
        description: "Activated charcoal trust fund ugh prism af...",
      },
    ],
    HIGHLIGHT: [
      {
        img: "/path/to/image3.jpg",
        title: "Deschamps explains Giroud inclusion, Martial omission",
        date: "25 SEP 2016 BY HUNTER SHELDON",
        description: "Banjo meggings narwhal hell of meditation...",
      },
      {
        img: "/path/to/image3.jpg",
        title: "Deschamps explains Giroud inclusion, Martial omission",
        date: "25 SEP 2016 BY HUNTER SHELDON",
        description: "Banjo meggings narwhal hell of meditation...",
      },
    ],
    INTERVIEWS: [
      {
        img: "/path/to/image4.jpg",
        title: "Exclusive Interview with Top Football Star",
        date: "26 SEP 2016 BY JANE DOE",
        description: "Deep dive into the career of a legendary player...",
      },
    ],
  };

  return (
    <div className="news-container">
      <header className="news-header">
        <h1 className="news-title">THE LATEST NEWS</h1>
        <div className="news-highlights">
          <div className="highlight">
            <p className="date">AUGUST 4, 2018</p>
            <h3>What to Expect in 2020 Season</h3>
            <p>If you missed it, we got a great recap!</p>
          </div>
          <div className="highlight">
            <p className="date">AUGUST 8, 2018</p>
            <h3>American Basketball Traditions</h3>
            <p>How this beautiful model met the courts of the streets...</p>
          </div>
          <div className="highlight video">
            <p className="date">OCTOBER 28, 2018</p>
            <h3>Video Footage of the Latest Game</h3>
          </div>
        </div>
      </header>
      
      <section className="team-news">
        <h2>TEAM NEWS</h2>
        <div className="news-tabs">
          <span className={activeTab === "NEW" ? "active" : ""} onClick={() => setActiveTab("NEW")}>NEW</span>
          <span className={activeTab === "HIGHLIGHT" ? "active" : ""} onClick={() => setActiveTab("HIGHLIGHT")}>HIGHLIGHT</span>
          <span className={activeTab === "INTERVIEWS" ? "active" : ""} onClick={() => setActiveTab("INTERVIEWS")}>INTERVIEWS</span>
        </div>
        
        <div className="news-grid">
          {newsData[activeTab].map((news, index) => (
            <article key={index} className="news-item">
              <img src={news.img} alt="news" />
              <h3>{news.title}</h3>
              <p className="date">{news.date}</p>
              <p>{news.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
