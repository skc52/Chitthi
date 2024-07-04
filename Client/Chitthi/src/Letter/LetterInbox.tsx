import React, { useState } from 'react';
import './LetterInbox.css';
import { useNavigate } from 'react-router-dom';

// Sample data for sent letters by Samip
const sentLetters = [
    {
      id: 1,
      sender: 'Samip',
      receiver: 'John',
      subject: 'Project Update lorem lroem ciedbuciude iueic biueubeiydb cixue beuy bxyewb b w',
      dateOfWriting: new Date('2023-07-01'),
      arrivalDate: new Date('2025-07-02'),
      content: 'Progress update on the project.'
    },
    {
      id: 2,
      sender: 'Samip',
      receiver: 'Alice',
      subject: 'Meeting Follow-up',
      dateOfWriting: new Date('2023-06-28'),
      arrivalDate: new Date('2023-06-29'),
      content: 'Follow-up notes from our recent meeting.'
    },
    {
      id: 3,
      sender: 'Samip',
      receiver: 'Emily',
      subject: 'Research Proposal',
      dateOfWriting: new Date('2023-07-05'),
      arrivalDate: new Date('2023-07-06'),
      content: 'Attached is the research proposal for your review.'
    },
    {
      id: 4,
      sender: 'Samip',
      receiver: 'Chris',
      subject: 'Monthly Report',
      dateOfWriting: new Date('2023-07-10'),
      arrivalDate: new Date('2023-07-11'),
      content: 'Here is the detailed monthly report for our department.'
    },
    {
      id: 5,
      sender: 'Samip',
      receiver: 'Olivia',
      subject: 'Team Meeting Agenda',
      dateOfWriting: new Date('2023-07-15'),
      arrivalDate: new Date('2023-07-16'),
      content: 'Agenda for the upcoming team meeting attached.'
    },
    {
      id: 6,
      sender: 'Samip',
      receiver: 'Michael',
      subject: 'Proposal for Client X',
      dateOfWriting: new Date('2023-07-20'),
      arrivalDate: new Date('2023-07-21'),
      content: 'Proposal draft for client X is ready for your feedback.'
    },
    {
      id: 7,
      sender: 'Samip',
      receiver: 'Emma',
      subject: 'Holiday Schedule',
      dateOfWriting: new Date('2023-07-25'),
      arrivalDate: new Date('2023-07-26'),
      content: `Nepal, nestled in the heart of the Himalayas, is a land of breathtaking natural beauty and rich cultural heritage. From the majestic peaks of Mount Everest to the lush green valleys of Pokhara, Nepal captivates with its diversity and charm. Its vibrant culture is a mosaic of traditions, languages, and festivals that reflect the country's deep-rooted history and spirituality.

The birthplace of Lord Buddha, Lumbini, stands as a testament to Nepal's significance as a spiritual hub for millions worldwide. Temples and stupas dot the landscape, offering solace and inspiration amidst serene surroundings. The bustling streets of Kathmandu, the capital city, blend ancient architecture with modern amenities, showcasing Nepal's journey through time while embracing progress.

Nepal's people, known for their warmth and hospitality, embody resilience and unity in diversity. The cuisine, a fusion of flavors from Himalayan herbs to spicy curries, delights the palate and reflects the country's agricultural bounty. Adventure seekers flock to Nepal for trekking, mountaineering, and rafting, drawn by the challenge and allure of the Himalayan peaks and rivers.

Beyond its natural and cultural splendor, Nepal faces challenges of development and sustainability, yet its spirit remains indomitable. The country's commitment to conservation, evident in its national parks and wildlife reserves, underscores its dedication to preserving its natural heritage for future generations.

In essence, Nepal, nestled in the heart of the Himalayas, is a land of breathtaking natural beauty and rich cultural heritage. From the majestic peaks of Mount Everest to the lush green valleys of Pokhara, Nepal captivates with its diversity and charm. Its vibrant culture is a mosaic of traditions, languages, and festivals that reflect the country's deep-rooted history and spirituality.

The birthplace of Lord Buddha, Lumbini, stands as a testament to Nepal's significance as a spiritual hub for millions worldwide. Temples and stupas dot the landscape, offering solace and inspiration amidst serene surroundings. The bustling streets of Kathmandu, the capital city, blend ancient architecture with modern amenities, showcasing Nepal's journey through time while embracing progress.

Nepal's people, known for their warmth and hospitality, embody resilience and unity in diversity. The cuisine, a fusion of flavors from Himalayan herbs to spicy curries, delights the palate and reflects the country's agricultural bounty. Adventure seekers flock to Nepal for trekking, mountaineering, and rafting, drawn by the challenge and allure of the Himalayan peaks and rivers.

Beyond its natural and cultural splendor, Nepal faces challenges of development and sustainability, yet its spirit remains indomitable. The country's commitment to conservation, evident in its national parks and wildlife reserves, underscores its dedication to preserving its natural heritage for future generations.

In essence, Nepal is more than a land of mountains and temples; it is a tapestry of experiences that captivate the soul and leave an indelible mark on all who visit. Whether exploring ancient kingdoms, trekking along pristine trails, or simply soaking in the Himalayan vistas, Nepal invites you to discover its beauty, embrace its diversity, and forge lasting memories amidst its enchanting landscapes.Nepal is more than a land of mountains and temples; it is a tapestry of experiences that captivate the soul and leave an indelible mark on all who visit. Whether exploring ancient kingdoms, trekking along pristine trails, or simply soaking in the Himalayan vistas, Nepal invites you to discover its beauty, embrace its diversity, and forge lasting memories amidst its enchanting landscapes.`
    },
    {
      id: 8,
      sender: 'Samip',
      receiver: 'Lucas',
      subject: 'Upcoming Event Invitation',
      dateOfWriting: new Date('2023-08-01'),
      arrivalDate: new Date('2023-08-02'),
      content: 'Invitation to attend the company’s annual event.'
    },
    {
      id: 9,
      sender: 'Samip',
      receiver: 'Sophia',
      subject: 'New Product Launch Details',
      dateOfWriting: new Date('2023-08-05'),
      arrivalDate: new Date('2023-08-06'),
      content: 'Detailed plan and timeline for the upcoming product launch.'
    },
    {
      id: 10,
      sender: 'Samip',
      receiver: 'David',
      subject: 'Training Session Feedback',
      dateOfWriting: new Date('2023-08-10'),
      arrivalDate: new Date('2023-08-11'),
      content: 'Feedback and summary from the recent training session.'
    },
    {
      id: 11,
      sender: 'Samip',
      receiver: 'Isabella',
      subject: 'Project Collaboration Request',
      dateOfWriting: new Date('2023-08-15'),
      arrivalDate: new Date('2023-08-16'),
      content: 'Request for collaboration on a new project initiative.'
    },
    {
      id: 12,
      sender: 'Samip',
      receiver: 'Mia',
      subject: 'Upcoming Deadline Reminder',
      dateOfWriting: new Date('2023-08-20'),
      arrivalDate: new Date('2023-08-21'),
      content: 'Reminder about the upcoming project deadline.'
    }
  ];
  

// Sample data for received letters by Samip
const receivedLetters = [
  {
    id: 3,
    sender: 'John',
    receiver: 'Samip',
    subject: 'Invitation to Event',
    dateOfWriting: new Date('2023-06-25'),
    arrivalDate: new Date('2023-06-26'),
    content: 'Invitation to attend an upcoming event.'
  },
  {
    id: 4,
    sender: 'Alice',
    receiver: 'Samip',
    subject: 'Feedback on Presentation',
    dateOfWriting: new Date('2023-06-20'),
    arrivalDate: new Date('2023-06-21'),
    content: 'Feedback and comments on your recent presentation.'
  }
];

type LetterType = 'sent' | 'received';

const LetterInbox: React.FC<any> = ({onLetterSelect}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<LetterType>('sent'); // Default filter to 'sent'
  const [selectedLetter, setSelectedLetter] = useState<any>(null); // State to hold the selected letter

  const handleFilterChange = (newFilter: LetterType) => {
    setFilter(newFilter);
    // setSelectedLetter(null); // Reset selected letter when filter changes
  };

  const handleLetterClick = (letter: any) => {
    if (isFutureDate(letter.arrivalDate)) {
      return;
    }

    //highlight the selected letter
    setSelectedLetter(letter);

    onLetterSelect(letter);
    // Navigate to /letter/view with the letter as the state
    // navigate(`/letter/view`, { state: { letter } });
  };

  // Function to check if a date is in the future
  const isFutureDate = (date: Date) => {
    const now = new Date();
    return date > now;
  };

  const sortedSentLetters = sentLetters.sort((a, b)=>b.dateOfWriting.getTime()-a.dateOfWriting.getTime());
  const sortedReceivedLetters = receivedLetters.sort((a, b)=>b.arrivalDate.getTime()-a.arrivalDate.getTime());

  return (
    <div className="letter-inbox">
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange('sent')}
          className={filter === 'sent' ? 'active' : ''}
        >
          Sent
        </button>
        <button
          onClick={() => handleFilterChange('received')}
          className={filter === 'received' ? 'active' : ''}
        >
          Received
        </button>
      </div>

      <div className="letter-list">
        {filter === 'sent' ? (
          sortedSentLetters.map((letter) => (
            <div
              key={letter.id}
              className={`letter-item ${isFutureDate(letter.arrivalDate) ? 'disabled' : ''}
                ${selectedLetter == letter ? 'selected':''}
              `}
              style={{ pointerEvents: isFutureDate(letter.arrivalDate) ? 'none' : 'auto' }}
              onClick={() => handleLetterClick(letter)}
            >
              <p>To: {letter.receiver}</p>
              <p>Subject: {letter.subject}</p>
              <p>Date Written: {letter.dateOfWriting.toLocaleDateString()}</p>
              <p>Receival Date: {letter.arrivalDate.toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          sortedReceivedLetters.map((letter) => (
            <div
              key={letter.id}
              className={`letter-item ${isFutureDate(letter.arrivalDate) ? 'disabled' : ''}
              ${selectedLetter == letter ? 'selected':''}
              `}
             style={{ pointerEvents: isFutureDate(letter.arrivalDate) ? 'none' : 'auto' }}
              onClick={() => handleLetterClick(letter)}
            >
              <p>From: {letter.sender}</p>
              <p>Subject: {letter.subject}</p>
              <p>Date Written: {letter.dateOfWriting.toLocaleDateString()}</p>
              <p>Arrival Date: {letter.arrivalDate.toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LetterInbox;
