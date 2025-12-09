import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Youtube from '../pages/Youtube';
import Facebook from '../pages/Facebook';
import Instagram from '../pages/Instagram';
import Tiktok from '../pages/Tiktok';
import FeedMaker from '../pages/FeedMaker';
import AdminLogin from '../pages/AdminLogin';
import Profile from '../pages/Profile';

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className='pt-[70px]'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/youtube" element={<Youtube />} />
                    <Route path="/facebook" element={<Facebook />} />
                    <Route path="/instagram" element={<Instagram />} />
                    <Route path="/tiktok" element={<Tiktok />} />
                    <Route path="/feedmaker" element={<FeedMaker />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppRoute;
