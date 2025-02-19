import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Profile from './components/user/Profile';
import Home from './components/pages/Home';
import ProductDetails from './components/product/ProductDetails';

import { Cart } from './components/cart/Cart';
import { Shipping } from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import  Payment   from './components/cart/Payment';


import Store from './components/pages/Store';
import Stats from './components/pages/Stats';
<<<<<<< HEAD
import Club from './components/pages/Club';
import News from './components/pages/News';
import Dashboard from './components/pages/Dashboard';
import Orders from './components/pages/Orders';
import Reviews from './components/pages/Reviews';
import Products from './components/pages/Products';

=======
import Club from './components/pages/Club';  
import News from './components/pages/News';  
import NewsDetail from './components/pages/NewsDetail';
import CreateNews from './components/pages/CreateNews'; // Shto komponentin e ri për krijimin e lajmit
import Dashboard from './components/pages/Dashboard'; 
import Orders from './components/pages/Orders'; 
import Reviews from './components/pages/Reviews'; 
import Products from './components/pages/Products'; 
import Users from './components/pages/Users'; 
import CreateStats from './components/pages/CreateStats';
>>>>>>> e71f179932aad17a0a570331e790143522ff2e8c

import Login from './components/user/Login';
import { Register } from './components/user/Register';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [clientSecret, setClientSecret] = useState('');

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) || {};
  const totalPrice = orderInfo.totalPrice || 0; // Default to 0 if not found


  // const getClientSecret = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!totalPrice || totalPrice <= 0) {
  //       console.warn("Total price is invalid, skipping API request.");
  //       return;
  //     }

  //     const { data } = await axios.post(
  //       'http://localhost:5000/api/v1/payment/process',
  //       { amount: totalPrice * 100 }, // Convert dollars to cents
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     console.log('Client Secret:', data.clientSecret); // Debugging
  //     setClientSecret(data.clientSecret);
  //   } catch (error) {
  //     console.error('Error fetching client secret:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (location.pathname === '/payment') {
  //     getClientSecret();
  //   }
  // }, [location.pathname]);

  const stripePromise = loadStripe("pk_test_51QpeSHB1HXaV2amnJOjHa0ZRLeg7mN8NGyBlaVFR5WJZ6fhFTrc8amwBOo5AAK2BJr2ATurUjGkZdnCTeQJKaxHo00x2xlGmWG");

  const options = {
    style: {
      base: {
        fontSize: '16px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  console.log('Client secret:', clientSecret);
  const PaymentPage = () => (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );

  return (
    <div className="App">
      {location.pathname !== '/dashboard' && <Header />}

      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/search/:keyword" element={<Store />} />

          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/payment" element={<PaymentPage />} />
            
            {/* <Route
                path="/payment"
                element={
                  clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <Payment />
                    </Elements>
                  ) : (
                    <div>Loading payment details...</div>
                  )
                }
            /> */}
          {/* Payment Route
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )} */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stats" element={<Stats />} />
<<<<<<< HEAD
          <Route path="/aboutUs" element={<Club />} />
          <Route path="/news" element={<News />} />
=======
          <Route path="/aboutUs" element={<Club />} /> 
          <Route path="/news" element={<News />} /> 
          <Route path="/news/:id" element={<NewsDetail />} /> 
          <Route path="/create-news" element={<CreateNews />} /> {/* Rruga e re për krijimin e lajmit */}
          <Route path="/create-stats" element={<CreateStats />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<Orders />} /> 
          <Route path="/dashboard/reviews" element={<Reviews/>} /> 
          <Route path="/dashboard/products" element={<Products />} /> 
          <Route path="/dashboard/users" element={<Users />} /> 
>>>>>>> e71f179932aad17a0a570331e790143522ff2e8c
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
