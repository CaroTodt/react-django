
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        
    };


  

    return (
        <div className='col-12 mt-5 d-flex justify-content-center text-center'>
              <div className="card"style={{width: "30rem"}}>
              <div className="card-body">
            <h1  className="card-title text-center">Sign In</h1>
            <p className="card-text text-center">Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='mb-3'>
                <label for="email" className="form-label">Email</label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                <label for="password" className="form-label">Password</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className="text-center">
                <button className='btn btn-primary  btn-block' type='submit'>Login</button>
                </div>
               
            </form>
            <p className='mt-3 text-center'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3 text-center'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
            </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(null,{})(Login);




