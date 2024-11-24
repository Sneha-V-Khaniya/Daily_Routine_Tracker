import React, { useState } from 'react';
import '../styles/Signup.css';
import CustomButton from '../components/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {handleAuthRequest} from '../utils/functions';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
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

        // login logic
        handleAuthRequest('/api/auth/login', formData, setUser, navigate, 'Login failed', setErrorMessage);

    };

    return (
        <div className='form-page'>
            <h1>Login</h1>
            <form className='form-container' onSubmit={handleSubmit}>
                
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


                <div className='grid-item odd' id='password-cnt'>
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

                <div className='grid-item even' id='submit-cnt'>
                    <p>Not have an account? <Link to='/signup' className='link'>signup</Link>  </p>
                    <div className='error-section'>{errorMessage}</div>

                    <CustomButton
                        text='Login'
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
