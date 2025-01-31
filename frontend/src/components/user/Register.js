import React ,{ Fragment, useState, useEffect }from 'react'

import MetaData from '../layout/MetaData';

//import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {register, clearErrors }from '../../actions/userActions'

import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/userActions';

import './Register.css'


export const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/public/images/default-avatar.png');

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData));
    };

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <div className="register-container">
                <div className="logo-overlay"></div>
                <div className="register-wrapper">
                    <form className="register-form" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="register-title">Create Account</h1>
                        
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
                                type="text" 
                                id="name_field" 
                                className="form-control" 
                                name="name" 
                                value={name} 
                                onChange={onChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input 
                                type="email" 
                                id="email_field" 
                                className="form-control" 
                                name="email" 
                                value={email} 
                                onChange={onChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input 
                                type="password" 
                                id="password_field" 
                                className="form-control" 
                                name="password" 
                                value={password} 
                                onChange={onChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img 
                                            src={avatarPreview} 
                                            className="rounded-circle" 
                                            alt="Avatar Preview" 
                                        />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input 
                                        type="file" 
                                        name="avatar" 
                                        className="custom-file-input" 
                                        id="customFile" 
                                        accept="images/*" 
                                        onChange={onChange} 
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="register-button" 
                            disabled={loading ? true : false}
                        >
                            REGISTER 
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};