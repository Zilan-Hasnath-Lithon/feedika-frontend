import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard';

const Signup = () => {
    const [name, setName] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [interests, setInterests] = useState([]);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleCheckbox = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const handleButton = async () => {
        try {
            const response = await axios.post(
                'https://feedika-backend.onrender.com/api/signup/signup',
                { name, ageGroup, interests, phone, email, password },
                { withCredentials: true }
            );

            console.log('Signup successful:', response.data);
            setName('');
            setAgeGroup('');
            setInterests([]);
            setPhone('');
            setEmail('');
            setPassword('');
            setErrorMsg('');

            navigate('/login');
        } catch (error) {
            if (error.response?.status === 409) {
                setErrorMsg('This email is already used');
            } else if (error.response?.status === 400) {
                setErrorMsg('Please fill all required fields');
            } else {
                setErrorMsg('Signup failed. Try again.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Age Group</label>
                    <select
                        value={ageGroup}
                        onChange={e => setAgeGroup(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                        <option value="">Select your age group</option>
                        <option value="Kid">Kid</option>
                        <option value="Teen">Teen</option>
                        <option value="Adult">Adult</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-medium">Interests</label>
                    <div className="grid grid-cols-3 gap-3">
                        {["Art", "Business", "Cartoon", "Education", "Entertainment", "Fun", "Health", "Lifestyle", "News", "Science", "Sports", "Travel"].map(item => (
                            <label key={item} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="accent-amber-400"
                                    checked={interests.includes(item)}
                                    onChange={() => handleCheckbox(item)}
                                />
                                <span className="ml-2">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your email"
                    />
                </div>

                {errorMsg && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                        {errorMsg}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleButton}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition-colors"
                >
                    Submit
                </button>
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

export default Signup;
