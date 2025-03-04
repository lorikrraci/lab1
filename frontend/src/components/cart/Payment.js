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
import { useSelector, useDispatch } from "react-redux";
import { CheckoutSteps } from "./CheckoutSteps";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { toast } from "react-toastify";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const orderState = useSelector((state) => state.order || {});
  const { error } = orderState;

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};

  useEffect(() => {
    const getClientSecret = async () => {
      if (!orderInfo.totalPrice || orderInfo.totalPrice <= 0) {
        toast.error("Invalid order total. Please check your cart.");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/payment/process",
          { amount: Math.round(orderInfo.totalPrice * 100) },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        toast.error("Failed to initialize payment.");
      }
    };
    getClientSecret();
  }, [orderInfo.totalPrice]);

  const handleCardChange = (event) => {
    if (event.brand) {
      setCardType(event.brand);
    } else {
      setCardType("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      toast.error("Payment system not ready.");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        const order = {
          orderItems: cartItems,
          shippingInfo,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          },
          itemsPrice: orderInfo.itemsPrice,
          taxPrice: orderInfo.taxPrice,
          shippingPrice: orderInfo.shippingPrice,
          totalPrice: orderInfo.totalPrice,
          userId: user.id,
        };

        console.log("Order data sent:", order); // Debug log
        await dispatch(createOrder(order));

        if (!error) {
          sessionStorage.removeItem("orderInfo");
          toast.success("Order completed successfully!");
          navigate("/success");
        } else {
          toast.error(`Failed to complete order: ${error}`);
          console.error("Order creation failed:", error);
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Redux error:", error);
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="payment-container">
        <div className="row wrapper">
          <div className="col-10 col-lg-6 payment-box">
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
                  : `Pay - $${orderInfo.totalPrice || "0.00"}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
