
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ResetPasswordConfirm = ({ match, reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);

    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        re_new_password: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('new_password')], 'Passwords must match')

    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password:''
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   

    const onSubmit = (data, e) => {
        e.preventDefault();
        
        const uid= match.params.uid;
        const token=match.params.token;

        reset_password_confirm(uid,token,data.new_password,data.re_new_password);
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
                    <p className="card-text text-center">Input your new password</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                            <label>New Password</label>
                            <input
                                name="new_password"
                                type="password"
                                onChange={e => onChange(e)}
                                {...register('new_password')}
                                className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.new_password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                name="re_new_password"
                                type="password"
                                onChange={e => onChange(e)}
                                {...register('re_new_password')}
                                className={`form-control ${errors.re_new_password ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.re_new_password?.message}</div>
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


export default connect(null, {reset_password_confirm })(ResetPasswordConfirm);




