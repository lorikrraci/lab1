import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import Loader from "../layout/Loader";
import ReactPaginate from "react-paginate";
import "./Store.css";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading, products, error, productCount, resPerPage, totalPages } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    ratings: 0,
    seller: "",
    numOfReviews: 0,
    images: "", // Changed to images
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
      return;
    }
    dispatch(getProducts("", currentPage, [1, 5000], "", 0, "id-asc"));
  }, [dispatch, isAuthenticated, user, navigate, currentPage]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleCreateProductToggle = () => {
    setShowCreateForm(!showCreateForm);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      ratings: 0,
      seller: "",
      numOfReviews: 0,
      images: "", // Changed to images
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "ratings" ||
        name === "numOfReviews"
          ? Number(value)
          : value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProduct(newProduct));
      setShowCreateForm(false);
      dispatch(getProducts("", currentPage, [1, 5000], "", 0, "id-asc"));
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct(editProduct.id, editProduct));
      console.log("Update completed");
      setEditProduct(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
        console.log("Delete completed");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  const renderErrors = () => {
    if (!error) return null;
    return <p style={{ color: "red" }}>{error}</p>;
  };

  return (
    <div style={{ padding: "100px 20px 20px", minHeight: "100vh" }}>
      <h1 style={{ color: "#A50304", marginBottom: "20px" }}>
        Manage Products
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {showCreateForm && (
            <div
              style={{
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ color: "#A50304" }}>Create New Product</h2>
              <form onSubmit={handleCreateSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <label>Name: </label>
                  <input
                    name="name"
                    value={newProduct.name}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Price: </label>
                  <input
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Category: </label>
                  <input
                    name="category"
                    value={newProduct.category}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Stock: </label>
                  <input
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Description: </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Ratings: </label>
                  <input
                    name="ratings"
                    type="number"
                    value={newProduct.ratings}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Seller: </label>
                  <input
                    name="seller"
                    value={newProduct.seller}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Number of Reviews: </label>
                  <input
                    name="numOfReviews"
                    type="number"
                    value={newProduct.numOfReviews}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Image URL: </label>
                  <input
                    name="images" // Changed to images
                    value={newProduct.images}
                    onChange={handleCreateChange}
                    placeholder="Enter image URL"
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#A50304",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "10px",
                  }}
                  disabled={loading}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCreateProductToggle}
                  style={{
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#A50304", color: "#fff" }}>
                  <th style={{ padding: "10px" }}>ID</th>
                  <th style={{ padding: "10px" }}>Name</th>
                  <th style={{ padding: "10px" }}>Price</th>
                  <th style={{ padding: "10px" }}>Category</th>
                  <th style={{ padding: "10px" }}>Stock</th>
                  <th style={{ padding: "10px" }}>Image</th>
                  <th style={{ padding: "10px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td style={{ padding: "10px" }}>{product.id}</td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <input
                            name="name"
                            value={editProduct.name}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          product.name
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <input
                            name="price"
                            type="number"
                            value={editProduct.price}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          `$${product.price}`
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <input
                            name="category"
                            value={editProduct.category}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          product.category
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <input
                            name="stock"
                            type="number"
                            value={editProduct.stock}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <input
                            name="images" // Changed to images
                            value={editProduct.images || ""}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            style={{ width: "100%" }}
                          />
                        ) : product.images ? (
                          <img
                            src={product.images}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editProduct?.id === product.id ? (
                          <>
                            <button
                              onClick={handleUpdate}
                              style={{
                                marginRight: "5px",
                                backgroundColor: "#A50304",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                              }}
                              disabled={loading}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditProduct(null)}
                              style={{
                                backgroundColor: "#666",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(product)}
                              style={{
                                marginRight: "5px",
                                backgroundColor: "#A50304",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                              }}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {resPerPage < productCount && (
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage - 1}
            />
          )}
          {renderErrors()}
        </>
      )}

      {isAuthenticated && user?.role === "admin" && (
        <button
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            backgroundColor: "#A50304",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
          onClick={handleCreateProductToggle}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Products;
