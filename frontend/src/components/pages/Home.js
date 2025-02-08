import React, { useState, useEffect } from 'react';
import './Home.css'; 
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [gameResults, setGameResults] = useState([]); // Shto state për rezultatet
    const navigate = useNavigate(); 

    // Merrni të dhënat nga localStorage dhe ruajeni vetëm 3 rezultatet më të fundit
    useEffect(() => {
        const savedGameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        setGameResults(savedGameResults.slice(0, 3)); // Merrni vetëm 3 rezultatet më të fundit
    }, []);

    const topPerformers = [
        { 
            title: 'Best Overall Stats', 
            name: 'Lorik Rraci', 
            position: 'Forward', 
            stat: '40 Index Per Game', 
            image: '' 
        },
        { 
            title: 'Most Points Per Game', 
            name: 'Alb Zhubi', 
            position: 'Guard', 
            stat: '20.3 PPG', 
            image: '' 
        },
        { 
            title: 'Most Assists Per Game', 
            name: 'Arb Sahatqija', 
            position: 'Point Guard', 
            stat: '8.7 APG', 
            image: '' 
        },
        { 
            title: 'Most Rebounds Per Game', 
            name: 'Ledion Kurhasku', 
            position: 'Center', 
            stat: '12.4 RPG', 
            image: '' 
        },
        { 
            title: 'Most Blocks Per Game', 
            name: 'Art Pozhegu', 
            position: 'Power Forward', 
            stat: '3.2 BPG', 
            image: '' 
        }
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
            <MetaData title={'KB Vëllaznimi'} />
            <div className="background-container">
                <h1 className="background-text">KB Vëllaznimi</h1>
            </div>

            {/* Results Section */}
            <div className="results-container">
                <h1 className="results-heading">Last Games Results</h1>
                <div className="results-list">
                    {gameResults.map((game, index) => ( // Tani përdorim gameResults për të shfaqur vetëm 3 rezultatet
                        <div className="result-box" key={index}>
                            <div className="logos">
                                <img className="team-logo" src={game.teamLogos[0]} alt={game.teams[0]} />
                                <span className="vs-text">VS</span>
                                <img className="team-logo" src={game.teamLogos[1]} alt={game.teams[1]} />
                            </div>
                            <p className="game-score">{game.score.team1} - {game.score.team2}</p>
                            <p className="game-date">{game.date}</p>
                        </div>
                    ))}
                </div>

                {/* Button to navigate to Stats page */}
                <div className="results-button-container">
                    <button
                        className="results-button"
                        onClick={() => navigate('/stats')}
                    >
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
                            <img src={player.image} alt={player.name} className="performer-image" />
                            <h3 className="performer-title">{player.title}</h3>
                            <p className="performer-name">{player.name}</p>
                            <p className="performer-position">{player.position}</p>
                            <p className="performer-stat">{player.stat}</p>
                        </div>
                    ))}
                </div>
                <button 
                    className="squad-button" 
                    onClick={() => (window.location.href = '/aboutUs')}
                >
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

                    {/* Button to navigate to Stats page */}
                    <div className="team-standing-button-container">
                        <button
                            className="team-standing-button"
                            onClick={() => navigate('/stats')}
                        >
                            Full Table
                        </button>
                    </div>
                </div>
            </div>

            {/* STORE SECTION */}
            <div className="store-section">
                <h2 className="store-title">STORE</h2>

                {/* First card - Slider */}
                <div className="store-card store-slider">
                    <p>Slider showcasing 3 store items</p>
                </div>

                {/* Second and Third Cards */}
                <div className="store-small-cards">
                    <div className="store-card store-small">
                        <p>Marketing for Store - Offer 1</p>
                    </div>
                    <div className="store-card store-small">
                        <p>Marketing for Store - Offer 2</p>
                    </div>
                </div>

                {/* "All Products" Button */}
                <button 
                    className="store-button" 
                    onClick={() => navigate('/store')}
                >
                    All Products
                </button>
            </div>
        </div>
    );
};

export default Home;
