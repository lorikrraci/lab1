import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Stats.css';

const CreateStats = () => {
    const [teams, setTeams] = useState(['', '']);
    const [score, setScore] = useState({ team1: '', team2: '' });
    const [date, setDate] = useState('');
    const [teamLogos, setTeamLogos] = useState([null, null]);
    const [stats, setStats] = useState([
        { label: "Field Goals", values: ["", ""] },
        { label: "3PT", values: ["", ""] },
        { label: "Free Throws", values: ["", ""] },
        { label: "Rebounds", values: ["", ""] },
        { label: "Assists", values: ["", ""] },
    ]);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.gameToUpdate) {
            const { gameToUpdate } = location.state;
            setTeams(gameToUpdate.teams);
            setScore(gameToUpdate.score);
            setDate(gameToUpdate.date);
            setTeamLogos(gameToUpdate.teamLogos);
            setStats(gameToUpdate.stats);
        }
    }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new or updated game result
        const newGameResult = {
            teams: teams,
            score: score,
            date: date,
            teamLogos: teamLogos,
            stats: stats,
        };

        const savedGameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
        let updatedGameResults;

        if (location.state && location.state.index !== undefined) {
            // If we're editing an existing game, replace it
            updatedGameResults = savedGameResults.map((game, index) => 
                index === location.state.index ? newGameResult : game
            );
        } else {
            // If it's a new game, add it to the list
            updatedGameResults = [...savedGameResults, newGameResult];
        }

        localStorage.setItem('gameResults', JSON.stringify(updatedGameResults));

        // Navigate back to the stats page
        navigate('/stats');
    };

    const handleLogoChange = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newLogos = [...teamLogos];
            newLogos[index] = reader.result;
            setTeamLogos(newLogos);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleScoreChange = (e, team) => {
        const newScore = { ...score };
        newScore[team] = e.target.value;
        setScore(newScore);
    };

    return (
        <div className="create-stats-container">
            <h1>{location.state ? 'Edit Game Result' : 'Add New Game Result'}</h1>
            <form onSubmit={handleSubmit} className="form-container">
                {/* Team 1 */}
                <div className="team-section">
                    <h2>{teams[0] || "Team 1"}</h2>
                    <div className="form-group">
                        <label>Team 1 Name:</label>
                        <input
                            type="text"
                            value={teams[0]}
                            onChange={(e) => setTeams([e.target.value, teams[1]])}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Team 1 Logo:</label>
                        <input
                            type="file"
                            onChange={(e) => handleLogoChange(e, 0)}
                            required
                        />
                        {teamLogos[0] && <img src={teamLogos[0]} alt="Team 1 Logo" width="50" />}
                    </div>

                    {/* Team 1 Score */}
                    <div className="form-group">
                        <label>Score for Team 1:</label>
                        <input
                            type="number"
                            value={score.team1}
                            onChange={(e) => handleScoreChange(e, 'team1')}
                            required
                        />
                    </div>

                    {stats.map((stat, index) => (
                        <div className="form-group" key={index}>
                            <label>{stat.label}:</label>
                            <input
                                type="text"
                                value={stat.values[0]}
                                onChange={(e) => {
                                    const newStats = [...stats];
                                    newStats[index].values[0] = e.target.value;
                                    setStats(newStats);
                                }}
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Team 2 */}
                <div className="team-section">
                    <h2>{teams[1] || "Team 2"}</h2>
                    <div className="form-group">
                        <label>Team 2 Name:</label>
                        <input
                            type="text"
                            value={teams[1]}
                            onChange={(e) => setTeams([teams[0], e.target.value])}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Team 2 Logo:</label>
                        <input
                            type="file"
                            onChange={(e) => handleLogoChange(e, 1)}
                            required
                        />
                        {teamLogos[1] && <img src={teamLogos[1]} alt="Team 2 Logo" width="50" />}
                    </div>

                    {/* Team 2 Score */}
                    <div className="form-group">
                        <label>Score for Team 2:</label>
                        <input
                            type="number"
                            value={score.team2}
                            onChange={(e) => handleScoreChange(e, 'team2')}
                            required
                        />
                    </div>

                    {stats.map((stat, index) => (
                        <div className="form-group" key={index}>
                            <label>{stat.label}:</label>
                            <input
                                type="text"
                                value={stat.values[1]}
                                onChange={(e) => {
                                    const newStats = [...stats];
                                    newStats[index].values[1] = e.target.value;
                                    setStats(newStats);
                                }}
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Date Section */}
                <div className="score-date-container">
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateStats;
