import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyOrders,
  updateOrder,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const [editOrderId, setEditOrderId] = useState(null);
  const [status, setStatus] = useState("");
  const [deliveredAt, setDeliveredAt] = useState("");

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const handleUpdate = (orderId) => {
    if (!status && !deliveredAt) {
      toast.error("Please select a status or delivered date");
      return;
    }
    dispatch(updateOrder(orderId, { status, deliveredAt }));
    setEditOrderId(null);
    setStatus("");
    setDeliveredAt("");
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  if (!user) return <div>Please log in to view your orders</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#A50304", marginBottom: "20px" }}>My Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#A50304",
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <th style={{ padding: "10px", minWidth: "50px" }}>ID</th>
                <th style={{ padding: "10px", minWidth: "60px" }}>User ID</th>
                <th style={{ padding: "10px", minWidth: "150px" }}>
                  Order Items
                </th>
                <th style={{ padding: "10px", minWidth: "100px" }}>
                  Payment Info
                </th>
                <th style={{ padding: "10px", minWidth: "80px" }}>
                  Items Price
                </th>
                <th style={{ padding: "10px", minWidth: "70px" }}>Tax</th>
                <th style={{ padding: "10px", minWidth: "80px" }}>Shipping</th>
                <th style={{ padding: "10px", minWidth: "90px" }}>Total</th>
                <th style={{ padding: "10px", minWidth: "90px" }}>Status</th>
                <th style={{ padding: "10px", minWidth: "100px" }}>Paid At</th>
                <th style={{ padding: "10px", minWidth: "100px" }}>
                  Delivered
                </th>
                <th style={{ padding: "10px", minWidth: "100px" }}>Created</th>
                <th style={{ padding: "10px", minWidth: "100px" }}>Updated</th>
                <th style={{ padding: "10px", minWidth: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {order.id}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {order.userId}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={JSON.parse(order.orderItems)
                        .map((item) => `${item.name} (x${item.quantity})`)
                        .join(", ")}
                    >
                      {JSON.parse(order.orderItems)
                        .map((item) => `${item.name} (x${item.quantity})`)
                        .join(", ")
                        .substring(0, 20) + "..."}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={JSON.stringify(JSON.parse(order.paymentInfo))}
                    >
                      {JSON.stringify(JSON.parse(order.paymentInfo)).substring(
                        0,
                        15
                      ) + "..."}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ${order.itemsPrice}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ${order.taxPrice}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ${order.shippingPrice}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right" }}>
                      ${order.totalPrice}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {editOrderId === order.id ? (
                        <select
                          value={status || order.orderStatus || "Processing"}
                          onChange={(e) => setStatus(e.target.value)}
                          style={{ width: "100%" }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      ) : (
                        order.orderStatus || "Processing"
                      )}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {order.paidAt
                        ? new Date(order.paidAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {editOrderId === order.id ? (
                        <input
                          type="date"
                          value={
                            deliveredAt ||
                            (order.deliveredAt
                              ? order.deliveredAt.split("T")[0]
                              : "")
                          }
                          onChange={(e) => setDeliveredAt(e.target.value)}
                        />
                      ) : order.deliveredAt ? (
                        new Date(order.deliveredAt).toLocaleDateString()
                      ) : (
                        "Pending"
                      )}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {editOrderId === order.id ? (
                        <button
                          onClick={() => handleUpdate(order.id)}
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditOrderId(order.id)}
                          style={{
                            backgroundColor: "#FFA500",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order.id)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="14"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
