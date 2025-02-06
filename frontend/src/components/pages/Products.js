import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);

    // Funksioni për të marrë produktet nga backend-i
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/products', { 
                credentials: 'include' // Nëse ke autentikim me cookie
            });
            const data = await response.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Funksioni për të fshirë një produkt
    const deleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(`http://localhost:5000/api/v1/admin/products/${productId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                alert('Product deleted successfully');
                fetchProducts(); // Rifresko listën e produkteve
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Thirr fetchProducts kur komponenti ngarkohet
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Products</h1>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#A50304', color: '#fff' }}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Ratings</th>
                            <th>Category</th>
                            <th>Seller</th>
                            <th>Stock</th>
                            <th>Number of Reviews</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
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
                                <td style={{ padding: '15px' }}>${product.price}</td>
                                <td style={{ padding: '15px' }}>{product.description}</td>
                                <td style={{ padding: '15px' }}>{product.ratings}</td>
                                <td style={{ padding: '15px' }}>{product.category}</td>
                                <td style={{ padding: '15px' }}>{product.seller}</td>
                                <td style={{ padding: '15px' }}>{product.stock}</td>
                                <td style={{ padding: '15px' }}>{product.numOfReviews}</td>
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
                                        onClick={() => deleteProduct(product.id)}
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