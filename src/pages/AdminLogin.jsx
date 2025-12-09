import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post(
                'https://feedika-backend.onrender.com/api/admin/adminlogin',
                { email, password },
                { withCredentials: true }
            );

            navigate('/feedmaker');
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all"
                >
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
