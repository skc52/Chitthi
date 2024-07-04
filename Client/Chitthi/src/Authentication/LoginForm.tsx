import React, {useState, useEffect} from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import './Login.css'

type FormValues = {
    username:string;
    password:string;
};

const schema = yup.object().shape({
    username:yup.string().required('Username is required'),
    password:yup.string().required('Password is required'),
})

const LoginForm:React.FC = () => {
    const {control, register, handleSubmit, formState:{errors}} = useForm<FormValues>({
        resolver:yupResolver(schema)
    });

    const onSubmit:SubmitHandler<FormValues> = (data) => {
        console.log(data);
        //handle login 
    }

    return (
        <>
        <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
            <div className='inputData'>
                <label htmlFor="username">Username</label>
                <input id='username' {...register('username')} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className='inputData'>
                <label htmlFor="password">Password</label>
                <input id='password' {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type='submit' className='loginBtn'>Login</button>
        </form>

        <br />
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
        </>
    )
};

export default LoginForm;