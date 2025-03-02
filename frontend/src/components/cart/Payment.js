import React, { Fragment, useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { CheckoutSteps } from "./CheckoutSteps";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/payment/process",
          {
            amount: Math.round(orderInfo.totalPrice * 100),
          }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };
    getClientSecret();
  }, []);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const handleCardChange = (event) => {
    if (event.brand) {
      setCardType(event.brand);
    } else {
      setCardType("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    setLoading(false);

    if (result.error) {
      console.error("Payment error:", result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        navigate("/success");
        console.log("Payment successful!");
      }
    }
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="payment-container">
        <div className="row wrapper">
          <div className="col-10 col-lg-6 payment-box">
            {" "}
            {/* Changed col-lg-5 to col-lg-6 for larger width */}
            <form className="payment-form shadow-lg" onSubmit={handleSubmit}>
              <h1 className="payment-title mb-4">Card Info</h1>

              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <CardNumberElement
                  id="card-number"
                  className="form-control payment-input"
                  onChange={handleCardChange}
                />
              </div>

              {cardType && (
                <p className="card-type">
                  Card Type: <strong>{cardType.toUpperCase()}</strong>
                </p>
              )}

              <div className="form-group">
                <label htmlFor="card-expiry">Expiry Date</label>
                <CardExpiryElement
                  id="card-expiry"
                  className="form-control payment-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="card-cvc">CVC</label>
                <CardCvcElement
                  id="card-cvc"
                  className="form-control payment-input"
                />
              </div>

              <button
                id="pay_btn"
                type="submit"
                className="btn btn-block py-3 payment-button"
                disabled={!stripe || loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay - $${orderInfo && orderInfo.totalPrice}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Payment;
