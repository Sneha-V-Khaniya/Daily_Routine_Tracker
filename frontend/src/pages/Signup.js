import React, { useState } from 'react';
import '../styles/Signup.css';
import CustomButton from '../components/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {handleAuthRequest} from '../utils/functions';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // signup logic
        handleAuthRequest('/api/auth/signup', formData, setUser, navigate, 'Signup failed', setErrorMessage);

    };

    return (
        <div className='form-page'>
            <h1>Signup</h1>
            <form className='form-container' onSubmit={handleSubmit}>

                {/* <h2 className='grid-item odd' id='signup-cnt' >Signup</h2> */}

                <div className='grid-item even' id='email-cnt'>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='grid-item odd' id='username-cnt'>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='grid-item even' id='password-cnt'>
                    <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='grid-item odd' id='submit-cnt'>
                    <p>Already have an account? <Link to='/login' className='link'>login</Link>  </p>
                    <div className='error-section'>{errorMessage}</div>
                    <CustomButton
                        text='Signup'
                        color='var(--charcoal)'
                        bgColor='var(--amber)'
                        hoverColor='var(--amber)'
                        hoverBgColor='var(--charcoal)'
                        type='submit'
                    />
                </div>
            </form>
            <div className="sticker" />
        </div>
    );
}
