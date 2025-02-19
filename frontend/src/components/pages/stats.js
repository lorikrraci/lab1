import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stats.css';

const Stats = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [gameResults, setGameResults] = useState([]);
    const gamesPerPage = 3;
    const totalPages = Math.ceil(gameResults.length / gamesPerPage);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve saved game results from localStorage
        const savedGameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        setGameResults(savedGameResults);
    }, []);

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    const startIndex = currentPage * gamesPerPage;
    const paginatedGames = gameResults.slice(startIndex, startIndex + gamesPerPage);

    const teamStandings = [
        { position: 1, teamName: "Bashkimi", matchesPlayed: 19, wins: 14, losses: 5, scored: 1513, conceded: 1370, goalDifference: "+143", points: 33 },
        { position: 2, teamName: "Trepça", matchesPlayed: 19, wins: 13, losses: 6, scored: 1546, conceded: 1354, goalDifference: "+192", points: 32 },
        { position: 3, teamName: "Sigal Prishtina", matchesPlayed: 19, wins: 11, losses: 8, scored: 1589, conceded: 1583, goalDifference: "+6", points: 30 },
        { position: 4, teamName: "Peja", matchesPlayed: 19, wins: 10, losses: 9, scored: 1495, conceded: 1457, goalDifference: "+38", points: 29 },
        { position: 5, teamName: "Vëllaznimi", matchesPlayed: 19, wins: 10, losses: 9, scored: 1452, conceded: 1451, goalDifference: "+1", points: 29 },
        { position: 6, teamName: "Golden Eagle Ylli", matchesPlayed: 19, wins: 8, losses: 11, scored: 1399, conceded: 1474, goalDifference: "-75", points: 27 },
        { position: 7, teamName: "Bora", matchesPlayed: 19, wins: 6, losses: 13, scored: 1495, conceded: 1542, goalDifference: "-47", points: 25 },
        { position: 8, teamName: "Proton Cable Prizreni", matchesPlayed: 19, wins: 4, losses: 15, scored: 1488, conceded: 1746, goalDifference: "-258", points: 23 },
    ];

    const handleDelete = (index) => {
        const updatedGameResults = gameResults.filter((_, i) => i !== index);
        setGameResults(updatedGameResults);
        localStorage.setItem('gameResults', JSON.stringify(updatedGameResults));
    };

    const handleUpdate = (index) => {
        const gameToUpdate = gameResults[index];
        navigate('/create-stats', { state: { gameToUpdate, index } });
    };
    

    return (
        <>
            {/* Team Standing Section */}
            <div className="team-standing-section">
                <div className="team-standing-content">
                    <h2 className="team-standing-heading">STANDINGS</h2>
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
                            {teamStandings.map((team) => (
                                <tr key={team.position}>
                                    <td>{team.position}</td>
                                    <td>{team.teamName}</td>
                                    <td>{team.matchesPlayed}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.losses}</td>
                                    <td>{team.scored}</td>
                                    <td>{team.conceded}</td>
                                    <td>{team.goalDifference}</td>
                                    <td>{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Results Section */}
            <div className="results-container">
                <h1 className="results-heading">Last Games Results</h1>
                <div className="results-list">
                    {paginatedGames.map((game, index) => (
                        <div className="result-box" key={index}>
                            <div className="logos">
                                <img className="team-logo" src={game.teamLogos[0]} alt={game.teams[0]} />
                                <span className="vs-text">VS</span>
                                <img className="team-logo" src={game.teamLogos[1]} alt={game.teams[1]} />
                            </div>
                            <p className="game-score">{game.score.team1} - {game.score.team2}</p>
                            <p className="game-date">{game.date}</p>
                            <table className="stats-table">
                                <thead>
                                    <tr>
                                        <th>Stats</th>
                                        <th>{game.teams[0]}</th>
                                        <th>{game.teams[1]}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {game.stats.map((stat, idx) => (
                                        <tr key={idx}>
                                            <td>{stat.label}</td>
                                            <td>{stat.values[0]}</td>
                                            <td>{stat.values[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {isAdmin && (
                                <div className="buttons-container">
                                <button className="delete-btn" onClick={() => handleDelete(startIndex + index)}>Delete</button>
                                <button className="update-btn" onClick={() => handleUpdate(startIndex + index)}>Update</button>
                              </div>
                              
                            )}
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0}>Previous</button>
                    <span> Page {currentPage + 1} of {totalPages} </span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>Next</button>
                </div>
            </div>

            {isAdmin && (
                <button className="fab" onClick={() => navigate('/create-stats')}>+</button>
            )}
        </>
    );
};

export default Stats;
