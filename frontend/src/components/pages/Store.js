import React, { Fragment, useState, useEffect } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './Store.css'; // Import the CSS file

import MetaData from '../layout/MetaData';
import Product from '../product/Product';
import Loader from '../layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';

const Store = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 5000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
    ];

    const dispatch = useDispatch();

    const { loading, products, error, productCount, resPerPage } = useSelector(
        (state) => state.products
    );

    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, error, keyword, currentPage, price, category, rating]);

    function handlePageClick(data) {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
    }
