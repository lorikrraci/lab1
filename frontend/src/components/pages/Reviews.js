import React from 'react';

const Reviews = () => {
    // Të dhënat e shembullit për vlerësimet (mund të zëvendësohen me të dhëna reale nga një API)
    const reviews = [
        {
            id: 1,
            productId: 101,
            userId: 201,
            rating: 4,
            comment: 'Great product, really satisfied!',
            reviewDate: '2025-01-12',
        },
        {
            id: 2,
            productId: 102,
            userId: 202,
            rating: 5,
            comment: 'Amazing quality, exceeded my expectations.',
            reviewDate: '2025-01-14',
        },
        {
            id: 3,
            productId: 103,
            userId: 203,
            rating: 3,
            comment: 'It’s okay, but could be better.',
            reviewDate: '2025-01-16',
        },
    ];

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
