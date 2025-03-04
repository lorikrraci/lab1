import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

const Success = () => {
  const navigate = useNavigate();
  const { order } = useSelector((state) => state.order); // Latest completed order
  const { user } = useSelector((state) => state.auth); // User details from auth state

  useEffect(() => {
    toast.success("Order completed successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  }, []);

  const handleContinueShopping = () => {
    navigate("/store");
  };

  const handleDownloadPDF = () => {
    if (order) {
      generateOrderPDF(order);
    } else {
      toast.error("No order data available for PDF generation");
    }
  };

  const generateOrderPDF = (orderData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Confirmation", 20, 20);

    doc.setFontSize(12);
    let yPos = 40;
    doc.text(`Order ID: ${orderData.id || "N/A"}`, 20, yPos);
    yPos += 10;
    doc.text(`Customer: ${user?.name || orderData.userId || "N/A"}`, 20, yPos);
    yPos += 10; // Use user.name
    doc.text(
      `Order Items: ${
        orderData.orderItems
          ? JSON.parse(orderData.orderItems)
              .map((item) => `${item.name} (x${item.quantity})`)
              .join(", ")
          : "N/A"
      }`,
      20,
      yPos,
      { maxWidth: 170 }
    );
    yPos += 20;
    doc.text(
      `Payment Info: ${
        orderData.paymentInfo
          ? JSON.stringify(JSON.parse(orderData.paymentInfo))
          : "N/A"
      }`,
      20,
      yPos,
      { maxWidth: 170 }
    );
    yPos += 20;
    doc.text(`Items Price: $${orderData.itemsPrice || "0.00"}`, 20, yPos);
    yPos += 10;
    doc.text(`Tax: $${orderData.taxPrice || "0.00"}`, 20, yPos);
    yPos += 10;
    doc.text(`Shipping: $${orderData.shippingPrice || "0.00"}`, 20, yPos);
    yPos += 10;
    doc.text(`Total: $${orderData.totalPrice || "0.00"}`, 20, yPos);
    yPos += 10;
    doc.text(`Status: ${orderData.orderStatus || "Delivered"}`, 20, yPos);
    yPos += 10;
    doc.text(
      `Paid At: ${
        orderData.paidAt ? new Date(orderData.paidAt).toLocaleString() : "N/A"
      }`,
      20,
      yPos
    );
    yPos += 10;
    doc.text(
      `Delivered At: ${
        orderData.deliveredAt
          ? new Date(orderData.deliveredAt).toLocaleString()
          : "N/A"
      }`,
      20,
      yPos
    );
    yPos += 10;
    doc.text(
      `Created At: ${new Date(orderData.createdAt).toLocaleString()}`,
      20,
      yPos
    );
    yPos += 10;
    doc.text(
      `Updated At: ${new Date(orderData.updatedAt).toLocaleString()}`,
      20,
      yPos
    );
    yPos += 10;

    doc.setFontSize(10);
    doc.text("Thank you for shopping with KB Vëllaznimi!", 20, yPos + 20);
    doc.save(`Order_${orderData.id || "Confirmation"}.pdf`);
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="./images/KB-Vellaznimi-logo.png"
            alt="KB Vëllaznimi"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <h1 style={{ fontSize: "24px", margin: 0 }}>KB VËLLAZNIMI</h1>
        </div>
        <h2 style={{ fontSize: "20px", color: "#28a745", margin: 0 }}>
          Order Confirmed!
        </h2>
      </header>

      {/* Order Details Section */}
      <section style={sectionStyle}>
        <h3
          style={{ fontSize: "18px", color: "#A50304", marginBottom: "15px" }}
        >
          Order Details
        </h3>
        {order ? (
          <div style={detailsStyle}>
            <p>
              <strong>Order ID:</strong> {order.id || "N/A"}
            </p>
            <p>
              <strong>Customer:</strong> {user?.name || order.userId || "N/A"}
            </p>{" "}
            {/* Updated to user.name */}
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {order.deliveredAt
                ? new Date(order.deliveredAt).toLocaleDateString()
                : "Pending"}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paidAt
                ? "Paid on " + new Date(order.paidAt).toLocaleDateString()
                : "Pending"}
            </p>
            {/* Order Items */}
            <h4 style={{ fontSize: "16px", marginTop: "20px" }}>
              Items Ordered:
            </h4>
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: "#f1f1f1" }}>
                  <th style={thStyle}>Item</th>
                  <th style={thStyle}>Quantity</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems &&
                  JSON.parse(order.orderItems).map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>{item.quantity}</td>
                      <td style={tdStyle}>${item.price || "N/A"}</td>
                      <td style={tdStyle}>
                        ${(item.quantity * (item.price || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Totals */}
            <div style={totalsStyle}>
              <p>
                <strong>Subtotal:</strong> ${order.itemsPrice || "0.00"}
              </p>
              <p>
                <strong>Tax:</strong> ${order.taxPrice || "0.00"}
              </p>
              <p>
                <strong>Shipping:</strong> ${order.shippingPrice || "0.00"}
              </p>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                <strong>Total:</strong> ${order.totalPrice || "0.00"}
              </p>
            </div>
          </div>
        ) : (
          <p>No order details available</p>
        )}
      </section>

      {/* Footer-like Summary */}
      <footer style={footerStyle}>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Thank you for your purchase! Download your receipt below.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleDownloadPDF}
            style={downloadButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Download PDF
          </button>
          <button
            onClick={handleContinueShopping}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#850303")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#A50304")}
          >
            Continue Shopping
          </button>
        </div>
      </footer>
    </div>
  );
};

// Styles (unchanged from previous version)
const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headerStyle = {
  width: "100%",
  maxWidth: "800px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px 10px 0 0",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const sectionStyle = {
  width: "100%",
  maxWidth: "800px",
  padding: "20px",
  backgroundColor: "#fff",
  flex: "1",
};

const detailsStyle = {
  fontSize: "14px",
  color: "#333",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
};

const totalsStyle = {
  marginTop: "20px",
  textAlign: "right",
};

const footerStyle = {
  width: "100%",
  maxWidth: "800px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "0 0 10px 10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonStyle = {
  backgroundColor: "#A50304",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const downloadButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default Success;
