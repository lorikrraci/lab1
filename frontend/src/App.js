import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import ProductDetails from './components/product/ProductDetails';
import Store from './components/pages/Store';
import Stats from './components/pages/Stats';
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

import Login from './components/user/Login';
import { Register } from './components/user/Register';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/dashboard' && <Header />}

      <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/search/:keyword" element={<Store />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stats" element={<Stats />} />
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
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;