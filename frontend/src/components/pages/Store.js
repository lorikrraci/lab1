import React, { Fragment, useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Store.css';
import MetaData from '../layout/MetaData';
import Product from '../product/Product';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';

const Store = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 5000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [sort, setSort] = useState('');

    const categories = ['Jersey', 'Shorts', 'T-shirts','Hoodies', 'Hat', 'Accessories', 'Bottle', 'Track-suit','Socks'];

    const dispatch = useDispatch();
    const { loading, products, error, productCount, resPerPage } = useSelector(state => state.products);
    const { keyword } = useParams(); // Get keyword from the URL
    const navigate = useNavigate();

    useEffect(() => {
        if (error) console.error(error);
        dispatch(getProducts(keyword, currentPage, price, category, rating, sort));
    }, [dispatch, error, keyword, currentPage, price, category, rating, sort]);
    
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);  // Update currentPage directly
    };
       
    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory === category ? '' : selectedCategory); // Allow deselecting category
        setCurrentPage(1);
    };
    
    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating === rating ? 0 : selectedRating); // Allow deselecting rating
        setCurrentPage(1); 
    };
    
    const displayedProducts = products?.slice((currentPage - 1) * resPerPage, currentPage * resPerPage);

    
    return (
        <div className="store-background">
            <div className="store-container">
                {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={'KB Vëllaznimi'} />
                        <h1 id="products_heading">Store</h1>
                        
                        {/* Sort Dropdown */}
                        <div className="sort-container">
                            <select 
                                className="form-select" 
                                value={sort} 
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="">Most Relevant</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A-Z</option>
                            </select>
                        </div>
                        <hr className="my-3" />

                        <section id="products" className="container mt-5">
                            <div className="row">
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    
                                    <Slider
                                        range
                                        marks={{ 1: `$1`, 5000: `$5000` }}
                                        min={1}
                                        max={5000}
                                        defaultValue={[1, 5000]}
                                        tipFormatter={value => `$${value}`}
                                        tipProps={{ placement: 'top', visible: true }}
                                        value={price || ''}
                                        onChange={setPrice}
                                    />
                                    <hr className="my-5" />
                                    <h4 className="mb-3">Categories</h4>
                                    <ul>
                                        {categories.map(category => (
                                            <li key={category} className="category-item" onClick={() => handleCategoryClick(category)}>
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                    <hr className="my-3" />
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul>
                                        {[5, 4, 3, 2, 1].map(star => (
                                            <li key={star} className="rating-item" onClick={() => handleRatingClick(star)}>
                                                {'⭐'.repeat(star)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-6 col-md-9">
                                    <div className="row">
                                    {displayedProducts?.map(product => <Product key={product.id} product={product} col={6} />)}
                                    </div>
                                </div>
                            </div>
                        </section>
                        {resPerPage < productCount && (
                                <ReactPaginate
                                pageCount={Math.ceil(productCount / resPerPage)}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                previousLabel="Previous"
                                nextLabel="Next"
                                activeClassName="active"
                                forcePage={currentPage - 1}
                            />
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default Store;