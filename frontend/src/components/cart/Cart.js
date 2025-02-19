import React ,{ Fragment} from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    const{ cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
            if (storedCartItems) {
                const validCartItems = JSON.parse(storedCartItems).filter(item => item.product);
                if (validCartItems.length > 0) {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: validCartItems
                    });
                }
            }
    }, [dispatch]);

    const increaseQuantity = (productId, currentQuantity, stock) => {
        if (currentQuantity < stock) {
            dispatch(addItemToCart(productId, 1)); // Increase by 1
        }
    };
    
    const decreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            dispatch(addItemToCart(productId, -1)); // Decrease by 1
        }
    };
    

      const removeItem = (id) => {
        dispatch(removeItemFromCart(id)); // Dispatch action to remove item from cart
    };

    const checkoutHandler = () =>
        navigate('/login?redirect=shipping')

  return (
    <Fragment>
        <MetaData title={'Your Cart'} />
            {cartItems.map(item => (
                <Fragment key={item.product}>
                    <hr />
                    <div className="cart-item">
                        <div className="row">
                            <div className="col-4 col-lg-3">
                                <img src={item.image} alt="image" height="90" width="115" />
                            </div>

                            <div className="col-5 col-lg-3">
                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                            </div>

                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p id="card_item_price">${item.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <div className="stockCounter d-inline">
                                     <span
                                        className="btn btn-danger minus"
                                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                                    >
                                        -
                                    </span>
                                    <input
                                        type="number"
                                        className="form-control count d-inline"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <span
                                        className="btn btn-primary plus"
                                        onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                                    >
                                        +
                                    </span>
                                </div>
                            </div>

                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeItem(item.product)}></i>
                            </div>
                        </div>
                    </div>
                    <hr />
                </Fragment>
            ))}


            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span class="order-summary-values">
                    {cartItems.reduce((acc, item)=> (acc + Number(item.quantity)), 0)} (Units)</span></p>
                    <p>Est. total: <span class="order-summary-values">$
                    {cartItems.reduce((acc, item)=> acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
    
                    <hr /> 
                    <button id="checkout_btn" class="btn btn-primary btn-block"
                    onClick={checkoutHandler}>Check out</button>
                </div>
            </div>
    </Fragment>
  )
}

export default Cart;