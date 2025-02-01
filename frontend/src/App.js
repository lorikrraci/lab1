import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import ProductDetails from './components/product/ProductDetails';
import Store from './components/pages/Store';
import Stats from './components/pages/Stats';
import Club from './components/pages/Club';  // Shto këtë linjë
import News from './components/pages/News';  // Shto këtë linjë

import Login from './components/user/Login';
import { Register } from './components/user/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
