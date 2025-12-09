import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContactCard from '../components/ContactCard';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.post(
                    "https://feedika-backend.onrender.com/api/profile/profile",
                    {},
                    { withCredentials: true }
                );
                setUser(res.data);
            } catch (err) {
                setUser(null);
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(
                "https://feedika-backend.onrender.com/api/profile/logout",
                {},
                { withCredentials: true }
            );
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const cardClass = "bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-gray-800 flex flex-col gap-6 hover:scale-105 transition-transform duration-300";

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 gap-10">
            {user ? (
                <div className={cardClass}>
                    <h2 className="text-3xl font-bold text-center text-amber-600">Your Profile</h2>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-600">Name:</span>
                            <span className="text-gray-800 font-semibold">{user.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-800 font-semibold">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-600">Age Group:</span>
                            <span className="text-gray-800 font-semibold">{user.ageGroup}</span>
                        </div>
                        <div className="flex justify-between items-start border-b pb-2">
                            <span className="font-medium text-gray-600">Interests:</span>
                            <span className="text-gray-800 font-semibold">{user.interests?.join(", ")}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className={cardClass + " text-center"}>
                    <h2 className="text-3xl font-bold text-blue-600">Welcome!</h2>
                    <p className="text-gray-700 text-lg">Please login or signup to view your profile and interests.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            Signup
                        </button>
                    </div>
                </div>
            )}

            <div className={cardClass}>
                <ContactCard
                    twitterUrl="https://x.com/ZilanHasnath"
                    githubUrl="https://github.com/Zilan-Hasnath-Lithon"
                />
            </div>
        </div>
    );
};

export default Profile;
