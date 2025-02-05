import React from 'react';

const Orders = () => {
    // Të dhënat e shembullit për porositë (mund të zëvendësohen me të dhëna reale nga një API)
    const orders = [
        {
            id: 1,
            userId: 101,
            orderItems: ['Product 1', 'Product 3'],
            paymentInfo: 'Credit Card',
            itemsPrice: '$50.00',
            taxPrice: '$5.00',
            shippingPrice: '$10.00',
            totalPrice: '$65.00',
            orderStatus: 'Shipped',
            paidAt: '2025-01-10',
            deliveredAt: '2025-01-15',
        },
        {
            id: 2,
            userId: 102,
            orderItems: ['Product 2'],
            paymentInfo: 'PayPal',
            itemsPrice: '$30.00',
            taxPrice: '$3.00',
            shippingPrice: '$7.00',
            totalPrice: '$40.00',
            orderStatus: 'Processing',
            paidAt: '2025-01-12',
            deliveredAt: '',
        },
        {
            id: 3,
            userId: 103,
            orderItems: ['Product 1', 'Product 2'],
            paymentInfo: 'Debit Card',
            itemsPrice: '$55.00',
            taxPrice: '$5.50',
            shippingPrice: '$8.00',
            totalPrice: '$68.50',
            orderStatus: 'Delivered',
            paidAt: '2025-01-14',
            deliveredAt: '2025-01-17',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Orders</h1>

            {/* Tabela e porosive */}
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
                            <th style={{ padding: '15px', textAlign: 'left' }}>User ID</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Order Items</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Payment Info</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Items Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Tax Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Shipping Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Total Price</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Order Status</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Paid At</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Delivered At</th>
                            <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>

                    {/* Trupi i tabelës */}
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                style={{
                                    borderBottom: '1px solid #ddd',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <td style={{ padding: '15px' }}>{order.id}</td>
                                <td style={{ padding: '15px' }}>{order.userId}</td>
                                <td style={{ padding: '15px' }}>{order.orderItems.join(', ')}</td>
                                <td style={{ padding: '15px' }}>{order.paymentInfo}</td>
                                <td style={{ padding: '15px' }}>{order.itemsPrice}</td>
                                <td style={{ padding: '15px' }}>{order.taxPrice}</td>
                                <td style={{ padding: '15px' }}>{order.shippingPrice}</td>
                                <td style={{ padding: '15px' }}>{order.totalPrice}</td>
                                <td style={{ padding: '15px' }}>{order.orderStatus}</td>
                                <td style={{ padding: '15px' }}>{order.paidAt}</td>
                                <td style={{ padding: '15px' }}>{order.deliveredAt || 'Pending'}</td>
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

export default Orders;
