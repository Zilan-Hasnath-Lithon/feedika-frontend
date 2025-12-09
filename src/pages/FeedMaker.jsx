import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedMaker = () => {
    const [title, setTitle] = useState('');
    const [socialMediaName, setSocialMediaName] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState([]);
    const [forAgeGroup, setForAgeGroup] = useState([]);
    const navigate = useNavigate();

    const categories = [
        "Art", "Business", "Cartoon", "Education", "Entertainment",
        "Fun", "Health", "Lifestyle", "News", "Science", "Sports", "Travel"
    ];

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                await axios.get('https://feedika-backend.onrender.com/api/admin/check', { withCredentials: true });
            } catch (err) {
                navigate('/adminlogin');
            }
        };
        checkAdmin();
    }, []);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleAgeGroupChange = (e) => {
        const value = e.target.value;
        setForAgeGroup(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = async () => {
        if (!title || !socialMediaName || !link || category.length === 0 || forAgeGroup.length === 0) {
            alert('Please fill all fields');
            return;
        }
        try {
            await axios.post('https://feedika-backend.onrender.com/api/feedmaker', {
                title,
                socialMediaName,
                link,
                category,
                forAgeGroup
            }, { withCredentials: true });

            setTitle('');
            setSocialMediaName('');
            setLink('');
            setCategory([]);
            setForAgeGroup([]);
            alert('Feed created successfully!');
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data?.message || 'Error creating feed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-300 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Feed</h2>

                <div className="space-y-4">
                    <input
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <select
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={socialMediaName}
                        onChange={(e) => setSocialMediaName(e.target.value)}
                    >
                        <option value="">Select Platform</option>
                        <option value="Youtube">Youtube</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Tiktok">Tiktok</option>
                    </select>

                    <input
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-700">For Age Group</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {["kid", "teen", "adult"].map(age => (
                        <label
                            key={age}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm ${forAgeGroup.includes(age)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-50 border-gray-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                value={age}
                                checked={forAgeGroup.includes(age)}
                                onChange={handleAgeGroupChange}
                                className="hidden"
                            />
                            {age}
                        </label>
                    ))}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-700">Content Category</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {categories.map((cat) => (
                        <label
                            key={cat}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm ${category.includes(cat)
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-gray-50 border-gray-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                value={cat}
                                checked={category.includes(cat)}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            {cat}
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition"
                >
                    Create Feed
                </button>
            </div>
        </div>
    );
};

export default FeedMaker;
