import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import Loader from "../layout/Loader";
import ReactPaginate from "react-paginate";
import "./Store.css"; // Ensure this CSS file includes pagination styles

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { loading, products, error, productCount, resPerPage, totalPages } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
      return;
    }
    console.log(
      "useEffect triggered - Fetching products for page:",
      currentPage
    );
    dispatch(getProducts("", currentPage, [1, 5000], "", 0, "id-asc"));
  }, [dispatch, isAuthenticated, user, navigate, currentPage]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate uses 0-based index
    console.log(
      "handlePageClick - New page selected:",
      newPage,
      "Previous page:",
      currentPage
    );
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Matches Store.js behavior
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  console.log("Rendering - Current state:", {
    currentPage,
    productsLength: products?.length,
    totalPages,
    productCount,
    resPerPage,
  });

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "calc(100vh - 60px)", // Adjust based on footer height (e.g., 60px)
        paddingBottom: "60px", // Ensure content doesn't overlap footer
      }}
    >
      <h1 style={{ color: "#A50304", marginBottom: "20px" }}>
        Manage Products
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#A50304", color: "#fff" }}>
                  <th style={{ padding: "15px" }}>ID</th>
                  <th style={{ padding: "15px" }}>Name</th>
                  <th style={{ padding: "15px" }}>Price</th>
                  <th style={{ padding: "15px" }}>Description</th>
                  <th style={{ padding: "15px" }}>Ratings</th>
                  <th style={{ padding: "15px" }}>Category</th>
                  <th style={{ padding: "15px" }}>Seller</th>
                  <th style={{ padding: "15px" }}>Stock</th>
                  <th style={{ padding: "15px" }}>Number of Reviews</th>
                  <th style={{ padding: "15px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      <td style={{ padding: "15px" }}>{product.id}</td>
                      <td style={{ padding: "15px" }}>{product.name}</td>
                      <td style={{ padding: "15px" }}>${product.price}</td>
                      <td style={{ padding: "15px" }}>{product.description}</td>
                      <td style={{ padding: "15px" }}>{product.ratings}</td>
                      <td style={{ padding: "15px" }}>{product.category}</td>
                      <td style={{ padding: "15px" }}>{product.seller}</td>
                      <td style={{ padding: "15px" }}>{product.stock}</td>
                      <td style={{ padding: "15px" }}>
                        {product.numOfReviews}
                      </td>
                      <td style={{ padding: "15px" }}>
                        <button
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                          onClick={() => console.log("Update", product.id)}
                        >
                          Update
                        </button>
                        <button
                          style={{
                            backgroundColor: "#f44336",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => console.log("Delete", product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      style={{ padding: "15px", textAlign: "center" }}
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
        </>
      )}
    </div>
  );
};

export default Products;
