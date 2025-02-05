import React from 'react';

const Users = () => {
    // Të dhënat e shembullit (mund të zëvendësohen me të dhëna reale nga një API)
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: '********', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '********', role: 'User' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', password: '********', role: 'Editor' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Users</h1>

            {/* Tabela e përdoruesve */}
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
                            <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Password</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>

                    {/* Trupi i tabelës */}
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <td style={{ padding: '15px' }}>{user.id}</td>
                                <td style={{ padding: '15px' }}>{user.name}</td>
                                <td style={{ padding: '15px' }}>{user.email}</td>
                                <td style={{ padding: '15px' }}>{user.password}</td>
                                <td style={{ padding: '15px' }}>{user.role}</td>
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

export default Users;