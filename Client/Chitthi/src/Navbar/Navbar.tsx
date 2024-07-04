import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faInbox, faSignOutAlt, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-item" onClick={() => navigate('/letter/new')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>New</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/profile')}>
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/letter/dashboard')}>
                <FontAwesomeIcon icon={faInbox} />
                <span>Inbox</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/logout')}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/register')}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Register</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Login</span>
            </div>
        </nav>
    );
};

export default Navbar;
