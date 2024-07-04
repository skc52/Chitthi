import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LetterInbox from './LetterInbox';
import LetterView from './LetterView';
import './LetterDashboard.css';

const LetterDashboard: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  const handleLetterSelection = (letter: any) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="letter-dashboard">
      {/* <div className="dashboard">
            <button className='plusBtn' >+</button>
            <button className='inboxBtn' >Inbox</button>
            <button className='profileBtn' >My Profile</button>


      </div> */}
      <div className="inbox-container">
        <LetterInbox onLetterSelect={handleLetterSelection} />
      </div>
      <div className="message-container">
        <Outlet />
        {selectedLetter ? 
          <LetterView letter={selectedLetter} />
          :
          <div>
              <p>Select an inbox to see</p>
          </div>
        }
      </div>
    </div>
  );
};

export default LetterDashboard;
