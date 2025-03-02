import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProducts.css"; // Importo skedarin CSS

const CreateProducts = () => {
  const navigate = useNavigate();

  // Shteti për të mbajtur të dhënat e produktit
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    category: "",
    seller: "",
    stock: "",
    numOfReviews: "",
  });

  // Funksioni për të përditësuar shtetin kur ndryshon inputi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Funksioni për të trajtuar submit-in e formës
  const handleSubmit = (e) => {
    e.preventDefault();

    // Këtu mund të shtoni logjikën për të dërguar të dhënat në backend (nëse është e nevojshme)
    console.log("Produkti i ri:", product);

    // Për momentin, thjesht navigo përsëri në faqen e produkteve
    navigate("/products");
  };

  return (
    <div className="create-product-container">
      <h1>Krijo një Produkt të Ri</h1>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ratings</label>
          <input
            type="number"
            name="ratings"
            value={product.ratings}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Seller</label>
          <input
            type="text"
            name="seller"
            value={product.seller}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>NumOfReviews</label>
          <input
            type="number"
            name="numOfReviews"
            value={product.numOfReviews}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Krijo Produktin
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;