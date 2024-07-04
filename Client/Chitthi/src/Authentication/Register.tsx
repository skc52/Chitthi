import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import './Register.css'
import axios from 'axios'
export type FormValues = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
  country: string;
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  country: yup.string().required('Country is required'),
  dateOfBirth: yup.date().max(new Date(), 'Date of Birth cannot be in the future').required('Date of Birth is required').typeError('Invalid date'),
});

export type CountryData = {
  country:string;
  region:string;
};

// Define the type for the entire JSON structure
export interface JsonResponse {
  data: Record<string, CountryData>;
}

const RegisterForm: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      dateOfBirth: new Date(), // Set default value to current date
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // handle form submission
  };

  const [countries, setCountries] = useState<string[]>([]);

  const fetchCountries = async()=>{
    const jsonData = await axios.get('https://api.first.org/data/v1/countries');
    // const countryData: = jsonData.data;
    const countryRecord:JsonResponse = jsonData.data.data;
    const countriesList: string[] = Object.values(countryRecord).map((entry: CountryData) => entry.country);
    setCountries(countriesList);
  }
  useEffect(() => {
    // Fetch countries list using axios or any other method
    fetchCountries();
  }, []);

  return (
    <>
    <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='inputData'>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className='inputData'>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div className='inputData'>
        <label htmlFor="country">Country</label>
        <select id="country" {...register('country')}>
          {countries.map((country: string, index: number) => (
            <option value={country} key={index}>{country}</option>
          ))}
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div className='dateData'>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <div>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePicker
              className='dateOfBirth'
              selected={field.value}
              onChange={(date: Date|null) => field.onChange(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select Date of Birth"
            />
          )}
        />
        </div>
        {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
      </div>
      <div className='inputData'>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className='inputData'>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div className='inputData'>
        <button type="submit" className='registerBtn'>Register</button>

      </div>
    </form>

    <br />
    <p>Already have an account?</p>
    <Link to = "/login">Login</Link>

    </>
  );
};

export default RegisterForm;
