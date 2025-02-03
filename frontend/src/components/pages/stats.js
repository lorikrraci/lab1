import React, { useState } from 'react';
import './Stats.css';

const gameResults = [
    { teams: ["Vëllaznimi", "Peja"], score: "87 - 72", date: "January 20, 2025", stats: [
        { label: "Field Goals", value: "31/60 - 27/55" },
        { label: "3PT", value: "9/18 - 7/20" },
        { label: "Free Throws", value: "16/18 - 11/14" },
        { label: "Rebounds", value: "45 - 38" },
        { label: "Assists", value: "22 - 18" },
    ]},
    { teams: ["Vëllaznimi", "Bora"], score: "95 - 89", date: "January 18, 2025", stats: [
        { label: "Field Goals", value: "36/70 - 32/68" },
        { label: "3PT", value: "8/15 - 9/21" },
        { label: "Free Throws", value: "15/20 - 12/18" },
        { label: "Rebounds", value: "42 - 40" },
        { label: "Assists", value: "23 - 20" },
    ]},
    { teams: ["Vëllaznimi", "Prishtina"], score: "78 - 82", date: "January 15, 2025", stats: [
        { label: "Field Goals", value: "28/58 - 32/64" },
        { label: "3PT", value: "6/13 - 5/14" },
        { label: "Free Throws", value: "10/12 - 15/19" },
        { label: "Rebounds", value: "38 - 35" },
        { label: "Assists", value: "19 - 17" },
    ]},
    { teams: ["Trepça", "Sigal Prishtina"], score: "101 - 95", date: "January 12, 2025", stats: [
        { label: "Field Goals", value: "38/70 - 36/72" },
        { label: "3PT", value: "10/22 - 8/19" },
        { label: "Free Throws", value: "15/18 - 13/16" },
        { label: "Rebounds", value: "48 - 42" },
        { label: "Assists", value: "25 - 21" },
    ]},
    { teams: ["Golden Eagle Ylli", "Bashkimi"], score: "90 - 85", date: "January 10, 2025", stats: [
        { label: "Field Goals", value: "33/68 - 30/65" },
        { label: "3PT", value: "9/20 - 7/18" },
        { label: "Free Throws", value: "15/17 - 12/15" },
        { label: "Rebounds", value: "43 - 40" },
        { label: "Assists", value: "22 - 19" },
    ]},
    { teams: ["Bashkimi", "Peja"], score: "85 - 80", date: "January 8, 2025", stats: [
        { label: "Field Goals", value: "32/66 - 28/65" },
        { label: "3PT", value: "8/19 - 6/17" },
        { label: "Free Throws", value: "13/15 - 12/14" },
        { label: "Rebounds", value: "40 - 38" },
        { label: "Assists", value: "20 - 18" },
    ]},
    { teams: ["Sigal Prishtina", "Bora"], score: "102 - 97", date: "January 6, 2025", stats: [
        { label: "Field Goals", value: "39/75 - 36/72" },
        { label: "3PT", value: "11/24 - 9/21" },
        { label: "Free Throws", value: "13/16 - 12/15" },
        { label: "Rebounds", value: "50 - 45" },
        { label: "Assists", value: "26 - 22" },
    ]},
    { teams: ["Vëllaznimi", "Golden Eagle Ylli"], score: "91 - 88", date: "January 4, 2025", stats: [
        { label: "Field Goals", value: "34/70 - 32/68" },
        { label: "3PT", value: "9/18 - 7/20" },
        { label: "Free Throws", value: "14/16 - 12/14" },
        { label: "Rebounds", value: "44 - 41" },
        { label: "Assists", value: "21 - 19" },
    ]},
    { teams: ["Trepça", "Proton Cable Prizreni"], score: "99 - 90", date: "January 2, 2025", stats: [
        { label: "Field Goals", value: "37/68 - 35/70" },
        { label: "3PT", value: "10/21 - 9/22" },
        { label: "Free Throws", value: "15/18 - 11/14" },
        { label: "Rebounds", value: "47 - 42" },
        { label: "Assists", value: "24 - 21" },
    ]},
];

const teamStandings = [
  { position: 1, teamName: "Bashkimi", matchesPlayed: 19, wins: 14, losses: 5, scored: 1513, conceded: 	1370, goalDifference: "+143", points: 33 },
  { position: 2, teamName: "Trepça", matchesPlayed: 19, wins: 13, losses: 6, scored: 1546, conceded: 1354, goalDifference: "+192", points: 32 },
  { position: 3, teamName: "Sigal Prishtina", matchesPlayed: 19, wins: 11, losses: 8, scored: 1589, conceded: 1583, goalDifference: "+6", points: 30 },
  { position: 4, teamName: "Peja", matchesPlayed: 19, wins: 10, losses: 9, scored: 1495, conceded: 1457, goalDifference: "+38", points: 29 },
  { position: 5, teamName: "Vëllaznimi", matchesPlayed: 19, wins: 10, losses: 9, scored: 1452, conceded: 1451, goalDifference: "+1", points: 29},
  { position: 6, teamName: "Golden Eagle Ylli", matchesPlayed: 19, wins: 8, losses: 11, scored: 1399, conceded: 1474, goalDifference: "-75", points: 27 },
  { position: 7, teamName: "Bora", matchesPlayed: 19, wins: 6, losses: 13, scored: 1495, conceded: 1542, goalDifference: "-47", points: 25 },
  { position: 8, teamName: "Proton Cable Prizreni", matchesPlayed: 19, wins: 4, losses: 15, scored: 1488, conceded: 1746, goalDifference: "-258", points: 23 },
];


const Stats = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const gamesPerPage = 3;
    const totalPages = Math.ceil(gameResults.length / gamesPerPage);

    const startIndex = currentPage * gamesPerPage;
    const paginatedGames = gameResults.slice(startIndex, startIndex + gamesPerPage);

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
                            {/* Map through the array and display data */}
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


            <div className="results-container">
                <h1 className="results-heading">Last Games Results</h1>
                <div className="results-list">
                    {paginatedGames.map((game, index) => (
                        <div className="result-box" key={index}>
                            <div className="logos">
                                <img className="team-logo" src="./images/KB-Vellaznimi-logo.png" alt={game.teams[0]} />
                                <span className="vs-text">VS</span>
                                <img className="team-logo" src="./images/KB-Peja-logo.png" alt={game.teams[1]} />
                            </div>
                            <p className="game-score">{game.score}</p>
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
                                            <td>{stat.value.split(" - ")[0]}</td>
                                            <td>{stat.value.split(" - ")[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0}>Previous</button>
                    <span> Page {currentPage + 1} of {totalPages} </span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>Next</button>
                </div>
            </div>
        </>
    );
};

export default Stats;
