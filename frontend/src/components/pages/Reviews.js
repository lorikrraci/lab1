import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Përdorim axios për të bërë kërkesa HTTP

const Reviews = () => {
    const [reviews, setReviews] = useState([]); // Ruajmë vlerësimet
    const [loading, setLoading] = useState(true); // Statusi për ngarkimin
    const [error, setError] = useState(null); // Për menaxhimin e gabimeve

    // Merr të dhënat nga API kur komponenti ngarkohet
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/reviews');
                setReviews(response.data.reviews); // Përdorim të dhënat nga API për të vendosur vlerësimet
            } catch (error) {
                console.error('Error fetching reviews:', error.response ? error.response.data : error.message);
                setError('Error fetching reviews'); // Menaxhojmë gabimet
            } finally {
                setLoading(false); // Ndalohet ngarkimi pas përfundimit të kërkesës
            }
        };

        fetchReviews();
    }, []); // Ky `useEffect` do të ekzekutohet një herë, kur komponenti ngarkohet

    // Shfaqja e një mesazhi ngarkimi nëse të dhënat janë duke u ngarkuar
    if (loading) {
        return <div>Loading...</div>;
    }

    // Shfaqja e një mesazhi gabimi nëse ka ndodhur një gabim
    if (error) {
        return <div>{error}</div>;
    }

    // Shfaqja e tabelës së vlerësimeve
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Reviews</h1>

            {/* Tabela e vlerësimeve */}
            <div style={{ overflowX: 'auto' }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                    }}
                >
                    {/* Header i tabelës */}
                    <thead>
                        <tr style={{ backgroundColor: '#A50304', color: '#fff' }}>
                            <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Product ID</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>User ID</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Rating</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Comment</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Review Date</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>

                    {/* Trupi i tabelës */}
                    <tbody>
                        {reviews.map((review) => (
                            <tr
                                key={review.id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <td style={{ padding: '15px' }}>{review.id}</td>
                                <td style={{ padding: '15px' }}>{review.productId}</td>
                                <td style={{ padding: '15px' }}>{review.userId}</td>
                                <td style={{ padding: '15px' }}>{review.rating}</td>
                                <td style={{ padding: '15px' }}>{review.comment}</td>
                                <td style={{ padding: '15px' }}>{review.reviewDate}</td>
                                <td style={{ padding: '15px' }}>
                                    {/* Butoni për UPDATE */}
                                    <button
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '8px 12px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginRight: '10px',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
                                    >
                                        Update
                                    </button>

                                    {/* Butoni për DELETE */}
                                    <button
                                        style={{
                                            backgroundColor: '#f44336',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '8px 12px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}
                                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reviews;