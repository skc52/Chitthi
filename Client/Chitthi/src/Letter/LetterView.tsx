import React from 'react';
import './LetterView.css';
import { useNavigate } from 'react-router';

const LetterView: React.FC<any> = ({ letter }) => {
    const navigate = useNavigate();
    
    const handleReplyClick = () => {
        navigate("/letter/new", { state: { receiver: letter.sender === "Samip" ? letter.receiver:letter.sender } });
    };

    return (
        <div className='view'>
            <div className="letter-details">
                <p className="date-written">Date Written: {letter.dateOfWriting.toLocaleDateString()}</p>
                <p className="arrival-date">Arrival Date: {letter.arrivalDate.toLocaleDateString()}</p>
                <p className="from">From: {letter.sender}</p>
                <p className="to">To: {letter.receiver}</p>
                <p className="subject">Subject: {letter.subject}</p>
                <p className="message">{letter.content}</p>
            </div>
            <button className='replyBtn' onClick={handleReplyClick}>Reply</button>

            <hr />

        </div>
    );
};

export default LetterView;
