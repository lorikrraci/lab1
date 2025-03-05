import React, { useState, useEffect } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";

const Home = () => {
  const [gameResults, setGameResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  // Fetch products and game results on mount
  useEffect(() => {
    // Fetch game results from localStorage
    const savedGameResults =
      JSON.parse(localStorage.getItem("gameResults")) || [];
    setGameResults(savedGameResults.slice(0, 3));

    // Fetch products from Redux store
    dispatch(getProducts("", 1, [1, 1000], "", 0, "id-asc", true)); // fetchAll=true to get all products
  }, [dispatch]);

  // Select 3 random products
  const getRandomProducts = (productsArray, count) => {
    if (!productsArray || productsArray.length === 0) return [];
    const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(products, 3);

  const topPerformers = [
    {
      title: "Best Overall Stats",
      name: "Azemi",
      position: "G",
      stat: "40 Index Per Game",
      image: "/images/player1.png",
    },
    {
      title: "Most Points Per Game",
      name: "Polloshka",
      position: "PG",
      stat: "20.3 PPG",
      image: "images/player44.png",
    },
    {
      title: "Most Assists Per Game",
      name: "Hellems",
      position: "F",
      stat: "8.7 APG",
      image: "/images/player9.png",
    },
    {
      title: "Most Rebounds Per Game",
      name: "Anderson",
      position: "PF",
      stat: "12.4 RPG",
      image: "/images/player3.png",
    },
    {
      title: "Most Blocks Per Game",
      name: "Jitoboh",
      position: "C",
      stat: "3.2 BPG",
      image: "/images/player33.png",
    },
  ];

  const teamStanding = {
    position: 5,
    teamName: "KB Vëllaznimi",
    matchesPlayed: 19,
    wins: 10,
    losses: 9,
    scored: 1452,
    conceded: 1451,
    basketDifference: 1,
    points: 29,
  };

  return (
    <div className="home-background">
      <MetaData title={"KB Vëllaznimi"} />
      <div className="background-container">
        <h1 className="background-text">KB Vëllaznimi</h1>
        <h3>
          Mirësevini në uebfaqën zyrtare të Klubit Basketbollistik Vëllaznimi ku
          ju mund të informoheni me më të rejat e klubit.
        </h3>
      </div>

      {/* Results Section */}
      <div className="results-container">
        <h1 className="results-heading">Last Games Results</h1>
        <div className="results-list">
          {gameResults.map((game, index) => (
            <div className="result-box" key={index}>
              <div className="logos">
                <img
                  className="team-logo"
                  src={game.teamLogos[0]}
                  alt={game.teams[0]}
                />
                <span className="vs-text">VS</span>
                <img
                  className="team-logo"
                  src={game.teamLogos[1]}
                  alt={game.teams[1]}
                />
              </div>
              <p className="game-score">
                {game.score.team1} - {game.score.team2}
              </p>
              <p className="game-date">{game.date}</p>
            </div>
          ))}
        </div>
        <div className="results-button-container">
          <button className="results-button" onClick={() => navigate("/stats")}>
            Shiko te gjitha rezultatet
          </button>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="performers-section">
        <h1 className="performers-heading">Top Performers</h1>
        <div className="performers-cards">
          {topPerformers.map((player, index) => (
            <div className="performer-card" key={index}>
              <img
                src={player.image}
                alt={player.name}
                className="performer-image"
              />
              <h3 className="performer-title">{player.title}</h3>
              <p className="performer-name">{player.name}</p>
              <p className="performer-position">{player.position}</p>
              <p className="performer-stat">{player.stat}</p>
            </div>
          ))}
        </div>
        <button className="squad-button" onClick={() => navigate("/aboutUs")}>
          Squad
        </button>
      </div>

      {/* Team Standing Section */}
      <div className="team-standing-section">
        <div className="team-standing-content">
          <h2 className="team-standing-heading">TEAM STANDING</h2>
          <table className="team-standing-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Ekipi</th>
                <th>Ndeshjet</th>
                <th>Fitoret</th>
                <th>Humbjet</th>
                <th>Shënuara</th>
                <th>Pranuara</th>
                <th>Kosh Diferenca</th>
                <th>Pikët</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{teamStanding.position}</td>
                <td>{teamStanding.teamName}</td>
                <td>{teamStanding.matchesPlayed}</td>
                <td>{teamStanding.wins}</td>
                <td>{teamStanding.losses}</td>
                <td>{teamStanding.scored}</td>
                <td>{teamStanding.conceded}</td>
                <td>{teamStanding.basketDifference}</td>
                <td>{teamStanding.points}</td>
              </tr>
            </tbody>
          </table>
          <div className="team-standing-button-container">
            <button
              className="team-standing-button"
              onClick={() => navigate("/stats")}
            >
              Full Table
            </button>
          </div>
        </div>
      </div>

      {/* STORE SECTION */}
      <div className="store-section">
        <h2 className="store-title">STORE</h2>

        {/* Slider Card with 3 Random Products */}
        <div className="store-card store-slider">
          {loading ? (
            <p>Loading products...</p>
          ) : randomProducts.length > 0 ? (
            <div className="product-slider">
              {randomProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card-home"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.images || "/images/default-product.jpg"} // Changed to product.images
                    alt={product.name}
                    className="product-image-home"
                  />
                  <h3 className="product-name-home">{product.name}</h3>
                  <p className="product-price-home">${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </div>

        {/* "All Products" Button */}
        <button className="store-button" onClick={() => navigate("/store")}>
          All Products
        </button>
      </div>
    </div>
  );
};

export default Home;
