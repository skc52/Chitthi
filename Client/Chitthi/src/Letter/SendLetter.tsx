import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { TextField, Button, Slider, Box } from '@mui/material';
import './SendLetter.css'; // Import your CSS file for styles
type FormValues = {
  message: string;
  subject: string;
  country: string;
  ageRange: [number, number];
};

const schema = yup.object().shape({
  message: yup.string().required('Message is required'),
  subject: yup.string().max(50).required('Subject is required'),
  country: yup.string().required('Country is required'),
  ageRange: yup.array().of(yup.number()).length(2)
});

interface CountryData {
  country: string;
  region: string;
}

interface JsonResponse {
  data: Record<string, CountryData>;
}

const SendLetterForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiver = location.state?.receiver || "Stranger"; // Use "Stranger" as default if no sender is provided

  const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues:{
        ageRange:[10,100],
        country:location.state?.country
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  const currentDate = new Date().toLocaleDateString(); // Format current date for display

  const [countries, setCountries] = useState<string[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://api.first.org/data/v1/countries');
      const countryRecord: JsonResponse = response.data;
      const countriesList: string[] = Object.values(countryRecord.data).map((entry: CountryData) => entry.country);
      setCountries(countriesList);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  useEffect(() => {
    // Fetch countries list using axios or any other method
    fetchCountries();
  }, []);

  return (
    <div className='letter'>
      <div className='header'>
        <p className='date'> Date: <span>{currentDate}</span></p>
        <p className='receiver'>To: {receiver}</p>
      </div>

        {receiver === "Stranger" &&
      <div className="filter">
        <div className="ageRangeContainer">
            <label htmlFor="ageRange">Age Range: </label>
            <Controller
                name="ageRange"
                control={control}
                render={({ field }) => (
                // <Box sx={{ width: 100, marginTop: 2 }}>
                    <Slider
                    sx = {{width:100}}
                    {...field}
                    valueLabelDisplay="auto"
                    min={18}
                    max={60}
                    onChange={(_, value) => field.onChange(value as [number, number])}
                    value={field.value}
                    />
                // </Box>
                )}
            />
            {errors.ageRange && <p>{errors.ageRange.message}</p>} {/* Display error message */}
            </div>
            <div className="countryContainer">
            <label htmlFor="country">Country:</label>
            <select id="country" {...register('country')}>
                <option value="Global">GLOBAL</option>
                {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
                ))}
            </select>
            {errors.country && <p>{errors.country.message}</p>} {/* Display error message */}
            </div>
        </div>
        }

      <form onSubmit={handleSubmit(onSubmit)} className='formClass'>
        <div className="subjectContainer">
          <input id='subject' {...register('subject')} placeholder='Subject...' />
          {errors.subject && <p>{errors.subject.message}</p>} {/* Display error message */}
        </div>

        <div className="messageContainer">
          <textarea id='message' {...register('message')} placeholder='Letter content...' />
          {errors.message && <p>{errors.message.message}</p>} {/* Display error message */}
        </div>

        <div className="buttons">
          <button className='backBtn' type='button' onClick={() => navigate(-1)}>Back</button>
          <button className='sendBtn' type='submit'>Send Letter</button>
        </div>
      </form>
    </div>
  );
};

export default SendLetterForm;
