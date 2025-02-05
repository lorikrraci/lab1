import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Merr të gjitha porositë nga backend-i
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/orders', { 
                credentials: 'include' // Nëse ke autentikim me cookie
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders); // Ruaj të dhënat në state
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Fshi një porosi
    const deleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            const response = await fetch(`http://localhost:3000/api/v1/order/${orderId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                alert('Order deleted successfully');
                fetchOrders(); // Rifresko listën e porosive
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Thirr fetchOrders kur komponenti ngarkohet
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#A50304', marginBottom: '20px' }}>Manage Orders</h1>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#A50304', color: '#fff' }}>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Order Items</th>
                            <th>Payment Info</th>
                            <th>Items Price</th>
                            <th>Tax Price</th>
                            <th>Shipping Price</th>
                            <th>Total Price</th>
                            <th>Order Status</th>
                            <th>Paid At</th>
                            <th>Delivered At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const orderItemsArray = JSON.parse(order["Order Items"]); // Konverto "Order Items" në array
                            return (
                                <tr key={order.ID}>
                                    <td>{order.ID}</td>
                                    <td>{order["User ID"]}</td>
                                    <td>{orderItemsArray.join(', ')}</td>
                                    <td>{order["Payment Info"]}</td>
                                    <td>${order["Items Price"]}</td>
                                    <td>${order["Tax Price"]}</td>
                                    <td>${order["Shipping Price"]}</td>
                                    <td>${order["Total Price"]}</td>
                                    <td>{order["Order Status"]}</td>
                                    <td>{order["Paid At"]}</td>
                                    <td>{order["Delivered At"] || 'Pending'}</td>
                                    <td>
                                        <button onClick={() => deleteOrder(order.ID)} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;