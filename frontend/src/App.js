import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Profile from "./components/user/Profile";
import Home from "./components/pages/Home";
import ProductDetails from "./components/product/ProductDetails";
import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import Store from "./components/pages/Store";
import Stats from "./components/pages/Stats";
import Club from "./components/pages/Club";
import News from "./components/pages/News";
import Dashboard from "./components/pages/Dashboard";
import Orders from "./components/pages/Orders";
import Reviews from "./components/pages/Reviews";
import Products from "./components/pages/Products";
import UsersDashboard from "./components/pages/UsersDashboard";
import Login from "./components/user/Login";
import { Register } from "./components/user/Register";
import RegisterSuccess from "./components/user/RegisterSuccess";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreateNews from "./components/pages/CreateNews";
import CreateStats from "./components/pages/CreateStats";
import NewsDetail from "./components/pages/NewsDetail";
import Success from "./components/cart/Success";
import { loadUser } from "./actions/userActions";
import Players  from "./components/pages/player";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const stripePromise = loadStripe(
    "pk_test_51QpeSHB1HXaV2amnJOjHa0ZRLeg7mN8NGyBlaVFR5WJZ6fhFTrc8amwBOo5AAK2BJr2ATurUjGkZdnCTeQJKaxHo00x2xlGmWG"
  );

  const PaymentPage = () => (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );

  return (
    <div className="App">
      {location.pathname !== "/dashboard" && <Header />}
      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/search/:keyword" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />{" "}
          {/* No protection here */}
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/reviews" element={<Reviews />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/users" element={<UsersDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/create-stats" element={<CreateStats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/aboutUs" element={<Club />} />
          <Route path="/news" element={<News />} />
          <Route path="/dashboard/player" element={<Players />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
