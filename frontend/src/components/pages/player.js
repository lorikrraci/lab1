import React, { useEffect, useState } from 'react';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/player');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      if (data.success) {
        setPlayers(data.players || []); // Adjust based on your backend response structure
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add the deletePlayer function here within the component
  const deletePlayer = async (playerId) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;
    
    try {
      const response = await fetch(`http://localhost:3001/api/v1/player/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token for authentication
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      const data = await response.json();
      if (data.success) {
        alert('Player deleted successfully');
        setPlayers(players.filter(player => player.id !== playerId)); // Update the list of players
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Players</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#A50304', color: '#fff' }}>
              <th>Jersey #</th>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(players) && players.length > 0 ? (
              players.map((player) => (
                <tr key={player.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td>{player.jersey_number}</td>
                  <td>{`${player.first_name} ${player.last_name || ''}`}</td>
                  <td>{player.position}</td>
                  <td>
                    <button 
                      onClick={() => deletePlayer(player.id)} 
                      style={{ 
                        backgroundColor: '#f44336', 
                        color: '#fff', 
                        padding: '8px 12px', 
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '10px', textAlign: 'center' }}>
                  No players found. Please add a player or check your connection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;