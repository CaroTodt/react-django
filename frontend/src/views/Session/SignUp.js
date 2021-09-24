
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const SignUp = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        first_name: Yup.string()
            .required('First Name is required'),
        last_name: Yup.string()
            .required('First Name is required'),

        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        re_password: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
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
        first_name:'',
        last_name:'',
        password: '',
        re_password:'',

    });

    const { email,first_name,last_name , password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
        if(data.password === data.re_password){
            signup(data.email,data.first_name,data.last_name,data.password,data.re_password);
            setAccountCreated(true);        
        }
        
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div className='col-12 mt-5 d-flex justify-content-center text-center'>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Sign Up</h1>
                    <p className="card-text text-center">Create your Account</p>
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
                            <label>First Name</label>
                            <input
                                name="first_name"
                                type="text"
                                onChange={e => onChange(e)}
                                {...register('first_name')}
                                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.first_name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="last_name"
                                type="text"
                                onChange={e => onChange(e)}
                                {...register('last_name')}
                                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.last_name?.message}</div>
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
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                name="re_password"
                                type="password"
                                onChange={e => onChange(e)}
                                {...register('re_password')}
                                className={`form-control ${errors.re_password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.re_password?.message}</div>
                        </div>
                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                               Register
                            </button>
                        </div>
                    </form>
                    <p className='mt-3 text-center'>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);




