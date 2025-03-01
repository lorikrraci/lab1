import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // Create a navigate function

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/store/search/${keyword}`); // Corrected route path
    } else {
      navigate("/store"); // Redirect to the store page when no keyword
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
