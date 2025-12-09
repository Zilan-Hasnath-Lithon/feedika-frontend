import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleButton = async () => {
        try {
            const response = await axios.post(
                'https://feedika-backend.onrender.com/api/login/login',
                { email, password },
                { withCredentials: true }
            );

            console.log('Login successful:', response.data);
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleButton}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition-colors"
                >
                    Login
                </button>

                <p className="text-[16px] pt-5 text-center">
                    Don't have an account?{' '}
                    <a className="font-bold text-blue-500" href="/signup">Signup</a>
                </p>
            </div>

            {/* Contact Card */}
            <div className="w-full max-w-md">
                <ContactCard
                    twitterUrl="https://x.com/ZilanHasnath"
                    githubUrl="https://github.com/Zilan-Hasnath-Lithon"
                />
            </div>
        </div>
    );
};

export default Login;
