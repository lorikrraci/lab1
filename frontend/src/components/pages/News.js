import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./news.css";

const News = () => {
  const [activeTab, setActiveTab] = useState("NEW");
  const [newsData, setNewsData] = useState({
    NEW: [],
    HIGHLIGHT: [],
    INTERVIEWS: [],
  });
  const navigate = useNavigate();

  const handleUpdateNews = (id) => {
    navigate(`/create-news?id=${id}`);
  };
  

  // Merr rolin e përdoruesit nga localStorage ose një sistem autentikimi
  const user = JSON.parse(localStorage.getItem("user")); // Supozojmë se ruani të dhënat e përdoruesit në localStorage
  const isAdmin = user && user.role === "admin"; // Kontrollo nëse përdoruesi është admin

  // Lexojmë lajmet nga localStorage kur komponenti ngarkohet
  useEffect(() => {
    const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
      NEW: [],
      HIGHLIGHT: [],
      INTERVIEWS: [],
    };
    setNewsData(savedNews);
  }, []);

  // Funksioni për të fshirë një lajm
  const handleDeleteNews = (id) => {
    const confirmDelete = window.confirm("A jeni i sigurt që doni ta fshini këtë lajm?");
    if (!confirmDelete) return;

    const updatedNews = {
      NEW: newsData.NEW.filter((news) => news.id !== id),
      HIGHLIGHT: newsData.HIGHLIGHT.filter((news) => news.id !== id),
      INTERVIEWS: newsData.INTERVIEWS.filter((news) => news.id !== id),
    };

    localStorage.setItem("newsData", JSON.stringify(updatedNews));
    setNewsData(updatedNews);

    alert("Lajmi u fshi me sukses!");
  };

  const handleCreateNews = () => {
    navigate("/create-news");
  };

  return (
    <div className="news-container">
      <header className="news-header">
        <h1 className="news-title">LAJMET E FUNDIT</h1>

        <div className="news-highlights">
          {newsData.NEW.slice(0, 2).map((news) => (
            <div key={news.id} className="highlight">
              <p className="date">{news.date}</p>
              <Link
                to={`/news/${news.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{news.title}</h3>
                <p>{news.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </header>

      <section className="team-news">
        <h2>LAJME PËR SKUADRËN</h2>
        <div className="news-tabs">
          <span
            className={activeTab === "NEW" ? "active" : ""}
            onClick={() => setActiveTab("NEW")}
          >
            E Re
          </span>
          <span
            className={activeTab === "HIGHLIGHT" ? "active" : ""}
            onClick={() => setActiveTab("HIGHLIGHT")}
          >
            Pikat Kryesore
          </span>
          <span
            className={activeTab === "INTERVIEWS" ? "active" : ""}
            onClick={() => setActiveTab("INTERVIEWS")}
          >
            Intervista
          </span>
        </div>

        <div key={activeTab} className="news-grid">
          {newsData[activeTab].map((news) => (
            <article key={news.id} className="news-item">
              <img src={news.img} alt="news" />
              <h3>{news.title}</h3>
              <p className="date">{news.date}</p>
              <p>{news.description}</p>
              <div className="news-actions">
                <Link to={`/news/${news.id}`} className="read-more">
                  Lexo më shumë
                </Link>
                {/* Shfaq butonat "Update" dhe "Delete" vetëm nëse përdoruesi është admin */}
                {isAdmin && (
                  <div className="buttons-container">
                    <button
                      className="update-button"
                      onClick={() => handleUpdateNews(news.id)} // Funksioni për të përditësuar lajmin
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteNews(news.id)}
                    >
                      Fshij
                    </button>
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>Regjistrohu për Newsletter-in tonë</h2>
        <p>Merr lajmet më të fundit të basketbollit direkt në emailin tënd.</p>
        <form>
          <input type="email" placeholder="Shkruaj emailin tënd" required />
          <button type="submit">Regjistrohu</button>
        </form>
      </section>

      {/* Shfaq butonin "+" vetëm nëse përdoruesi është admin */}
      {isAdmin && (
        <button className="create-news-button" onClick={handleCreateNews}>
          +
        </button>
      )}
    </div>
  );
};

export default News;