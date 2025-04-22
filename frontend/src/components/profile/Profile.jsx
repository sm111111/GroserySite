import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const res = await axios.get("http://localhost:5000/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate('/');
            }
        };

        fetchProfile();
    }, [navigate]);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className='profile-container'>
            <div className="inside-profile">
                <h1>Profile Page</h1>
                {user ? (
                    <div className='pro'>
                        <h2>Name: {user.name}</h2>
                        <h3>Email: {user.email}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
