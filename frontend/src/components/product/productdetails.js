import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      await dispatch(addItemToCart(id, quantity));
      toast.success("Items Added to Cart");
    } catch (err) {
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              {product.images ? (
                <Carousel pause="hover">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={product.images || "/images/default-product.jpg"}
                      alt={product.name}
                    />
                  </Carousel.Item>
                </Carousel>
              ) : (
                <img
                  className="d-block w-100"
                  src="/images/default-product.jpg"
                  alt={product.name}
                />
              )}
            </div>
            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product ID: {product.id}</p>
              <hr />
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              <hr />
              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />
                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <hr />
              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Seller: <strong>{product.seller}</strong>
              </p>
              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>
                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>
                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
