import React from 'react';
import './Profile.css'; // Import your CSS file for styles

interface ProfileProps {
    name: string;
    username: string;
    country: string;
    dateOfBirth: string;
    numberOfPenPals: number;
    profilePicture: string; // Assuming it's a URL
}

const Profile: React.FC = ( ) => {
    //we will fetch profile info on useEffect
    const user:ProfileProps = {} as ProfileProps;
    const {profilePicture, name, username, country, dateOfBirth, numberOfPenPals} = user;
    return (
        <div className="profile">
            <div className="profile-picture">
                <img src={profilePicture} alt="Profile" />
            </div>
            <div className="profile-details">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Country:</strong> {country}</p>
                <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
                <p><strong>Number of Pen Pals:</strong> {numberOfPenPals}</p>
            </div>
        </div>
    );
};

export default Profile;
