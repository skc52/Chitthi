import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './SendLetter.css'; // Import your CSS file for styles

type FormValues = {
    message: string;
    subject: string;
};

const schema = yup.object().shape({
    message: yup.string().required('Message is required'),
    subject: yup.string().max(50).required('Subject is required'),
});

const SendLetterForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receiver = location.state?.receiver || "Stranger"; // Use "Stranger" as default if no sender is provided

    const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    const currentDate = new Date().toLocaleDateString(); // Format current date for display

    return (
        <div className='letter'>
            <div className='header'>
                <p className='date'> Date: <span>{currentDate}</span></p>
                <p className='receiver'>To: {receiver}</p>
            </div>
           
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
