import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import Search from './Search';
import { FaShoppingCart } from 'react-icons/fa'; // Importing a cart icon

export const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart); // Get cart items from Redux state

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout()); // Call the logout action
    };

    return (
        <header
            style={{
                backgroundColor: '#A50304',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                    src="./images/KB-Vellaznimi-logo.png"
                    alt="KB Vëllaznimi"
                    style={{ height: '50px', marginRight: '10px' }}
                />
                <h1
                    style={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        margin: '0',
                    }}
                >
                    KB VËLLAZNIMI
                </h1>
            </Link>

            {(location.pathname === '/store' || location.pathname.startsWith('/store/search/')) && (
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>
            )}

            <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Kryefaqja</Link>
                <Link to="/aboutUs" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Klubi</Link>
                <Link to="/store" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Dyqani</Link>
                <Link to="/stats" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Rezultatet</Link>
                <Link to="/news" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Lajmet</Link>
                
                {isAuthenticated && user?.role === 'admin' && (
                    <Link to="/dashboard" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>
                        Dashboard
                    </Link>
                )}

                {/* Cart Button */}
                <Link to="/cart" style={{ position: 'relative', color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>
                    <FaShoppingCart size={20} />
                    {cartItems.length > 0 && (
                        <span
                            style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-10px',
                                backgroundColor: 'yellow',
                                color: 'black',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                padding: '3px 7px',
                            }}
                        >
                            {cartItems.length}
                        </span>
                    )}
                </Link>

                {user ? (
                    <div className="ml-4 dropdown d-inline">
                        <button className="btn dropdown-toggle text-white"
                            type="button" id="dropDownMenuButton" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <span>{user && user.name}</span>
                        </button>

                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            <Link className="dropdown-item" to="/me">Profile</Link>
                            <Link className="dropdown-item" to="#" onClick={handleLogout} style={{ color: '#A50304', fontWeight: 'bold', textDecoration: 'none' }}>
                                Logout
                            </Link>
                        </div>
                    </div>
                ) : !loading && (
                    <Link to="/login" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
