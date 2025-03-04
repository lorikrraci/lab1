import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated && user) {
      const storedCartItems = localStorage.getItem(`cartItems_${user.id}`);
      if (storedCartItems) {
        const parsedItems = JSON.parse(storedCartItems);
        if (JSON.stringify(parsedItems) !== JSON.stringify(cartItems)) {
          dispatch({
            type: "ADD_TO_CART",
            payload: parsedItems,
          });
        }
      }
    }
    console.log("Current cart items:", cartItems);
  }, [dispatch, isAuthenticated, user, cartItems]);

  const increaseQuantity = (productId, currentQuantity, stock) => {
    if (currentQuantity < stock) {
      dispatch(addItemToCart(productId, 1));
    }
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(addItemToCart(productId, -1));
    }
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping"); // Go directly to shipping if logged in
    } else {
      navigate("/login?redirect=shipping"); // Redirect to login if not authenticated
    }
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <div className="row flex-grow-1">
          <div className="col-12 col-lg-8">
            {cartItems.length === 0 ? (
              <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
              cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="image"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
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
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeItem(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="col-12 col-lg-4 my-4">
              <div id="order_summary" className="order-summary-box">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
