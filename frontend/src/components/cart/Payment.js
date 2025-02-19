import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
// import './Payment.css'; // Create this CSS file to style the form as required

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axios.post("http://localhost:5000/api/v1/payment/process", {
          amount: 1000, // Example: $10.00 (Stripe requires amounts in cents)
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };
    getClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error("Payment error:", result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
      }
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
          <h1 className="mb-4">Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardElement
              id="card_num_field"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <input
              type="text"
              id="card_exp_field"
              className="form-control"
              value=""
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <input
              type="text"
              id="card_cvc_field"
              className="form-control"
              value=""
            />
          </div>

          <button
            id="pay_btn"
            type="submit"
            className="btn btn-block py-3"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};




// import React, { Fragment } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import MetaData from '../layout/MetaData';
// import { CheckoutSteps } from './CheckoutSteps';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { useNavigate } from 'react-router-dom';

// export const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       toast.error(submitError.message);
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000/order/success', // Update with your success URL
//       },
//     });

//     if (error) {
//       toast.error(error.message);
//     } else {
//       toast.success('Payment successful!');
//       navigate('/order/success'); // Redirect to success page
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title={'Payment'} />
//       <CheckoutSteps shipping confirmOrder payment />

//       <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//     </Fragment>
//   );
// };
export default Payment;