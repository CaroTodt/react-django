
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = ({ login, isAuthenticated }) => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   

    const onSubmit = (data, e) => {
        e.preventDefault();
        login(data.email,data.password);
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }



    return (
        <div className='col-12 mt-5 d-flex justify-content-center text-center'>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Sign In</h1>
                    <p className="card-text text-center">Sign into your Account</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                type="text"
                                onChange={e => onChange(e)}
                                {...register('email')}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={e => onChange(e)}
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
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

export default connect(mapStateToProps, { login })(Login);




