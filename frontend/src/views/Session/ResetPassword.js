
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import axios from 'axios';

const ResetPassword = ({ reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),

    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const [formData, setFormData] = useState({
        email: ''
    });

    const { email} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   

    const onSubmit = (data, e) => {
        e.preventDefault();
        reset_password(data.email);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Redirect to='/' />
    }



    return (
        <div className='col-12 mt-5 d-flex justify-content-center text-center'>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <h1 className="card-title text-center">Reset Password</h1>
                    <p className="card-text text-center">Input your email for reset your password.</p>
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

                        <br />
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};


export default connect(null, {reset_password })(ResetPassword);




