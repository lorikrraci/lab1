import React from 'react';

const Products = () => {
    // Të dhënat e shembullit për produktet (mund të zëvendësohen me të dhëna reale nga një API)
    const products = [
        {
            id: 1,
            name: 'Product 1',
            price: '$25.00',
            description: 'This is a description for product 1.',
            ratings: 4.5,
            images: ['img1.jpg'],
            category: 'Category A',
            seller: 'Seller 1',
            stock: 100,
            numberOfReviews: 50,
        },
        {
            id: 2,
            name: 'Product 2',
            price: '$30.00',
            description: 'This is a description for product 2.',
            ratings: 4.0,
            images: ['img2.jpg'],
            category: 'Category B',
            seller: 'Seller 2',
            stock: 50,
            numberOfReviews: 30,
        },
        {
            id: 3,
            name: 'Product 3',
            price: '$20.00',
            description: 'This is a description for product 3.',
            ratings: 4.8,
            images: ['img3.jpg'],
            category: 'Category C',
            seller: 'Seller 3',
            stock: 70,
            numberOfReviews: 80,
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Products</h1>

            {/* Tabela e produkteve */}
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
                            <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Description</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Ratings</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Seller</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Number of Reviews</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>

                    {/* Trupi i tabelës */}
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <td style={{ padding: '15px' }}>{product.id}</td>
                                <td style={{ padding: '15px' }}>{product.name}</td>
                                <td style={{ padding: '15px' }}>{product.price}</td>
                                <td style={{ padding: '15px' }}>{product.description}</td>
                                <td style={{ padding: '15px' }}>{product.ratings}</td>
                                <td style={{ padding: '15px' }}>{product.category}</td>
                                <td style={{ padding: '15px' }}>{product.seller}</td>
                                <td style={{ padding: '15px' }}>{product.stock}</td>
                                <td style={{ padding: '15px' }}>{product.numberOfReviews}</td>
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

export default Products;
