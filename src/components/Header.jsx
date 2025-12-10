import React, { useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillTikTok } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* HEADER */}
            <div className='py-3 md:py-2 shadow-md fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md'>
                <div className='mx-4 md:mx-18 flex items-center justify-between max-w-[1500px] mx-auto'>

                    {/* Logo */}
                    <div>
                        <h1 className="text-[28px] md:text-[36px] font-extrabold cursor-pointer text-blue-700 tracking-wide hover:text-blue-800 transition">
                            <Link to="/">feedika</Link>
                        </h1>
                    </div>

                    {/* Desktop Nav */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-x-6 md:gap-x-14 text-[22px] md:text-[30px]'>
                            <li className={`cursor-pointer pb-1 border-b-2 transition-all hover:border-blue-400 ${location.pathname === "/" ? "border-blue-600" : "border-transparent"}`}>
                                <Link to="/" className='hover:scale-110 transition'><FaHome /></Link>
                            </li>
                            <li className={`cursor-pointer pb-1 border-b-2 transition-all hover:border-blue-400 ${location.pathname === "/youtube" ? "border-blue-600" : "border-transparent"}`}>
                                <Link to="/youtube" className='hover:scale-110 transition'><IoLogoYoutube /></Link>
                            </li>
                            <li className={`cursor-pointer pb-1 border-b-2 transition-all hover:border-blue-400 ${location.pathname === "/facebook" ? "border-blue-600" : "border-transparent"}`}>
                                <Link to="/facebook" className='hover:scale-110 transition'><IoLogoFacebook /></Link>
                            </li>
                            <li className={`cursor-pointer pb-1 border-b-2 transition-all hover:border-blue-400 ${location.pathname === "/instagram" ? "border-blue-600" : "border-transparent"}`}>
                                <Link to="/instagram" className='hover:scale-110 transition'><BiLogoInstagramAlt /></Link>
                            </li>
                            <li className={`cursor-pointer pb-1 border-b-2 transition-all hover:border-blue-400 ${location.pathname === "/tiktok" ? "border-blue-600" : "border-transparent"}`}>
                                <Link to="/tiktok" className='hover:scale-110 transition'><AiFillTikTok /></Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account Icon (Desktop) */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center text-[28px] md:text-[35px]'>
                            <li className='cursor-pointer hover:scale-110 transition'>
                                <Link to="/profile"><RiAccountCircleFill /></Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className='md:hidden text-3xl cursor-pointer' onClick={() => setOpen(true)}>
                        <HiMenu />
                    </div>

                </div>
            </div>

            {/* Overlay */}
            {open && (
                <div 
                    className='fixed inset-0 bg-black/40 z-40'
                    onClick={() => setOpen(false)}
                />
            )}

            {/* MOBILE SIDEBAR */}
            <div className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl z-50 transform transition-transform duration-300 
                ${open ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Close Button */}
                <div className='flex justify-end p-4 text-3xl cursor-pointer' onClick={() => setOpen(false)}>
                    <HiX />
                </div>

                {/* Sidebar Menu */}
                <ul className="flex flex-col gap-6 text-[24px] px-6 mt-4">

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/" 
                            className={`flex items-center gap-3 p-2 rounded-md transition 
                                ${location.pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            <FaHome /> Home
                        </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/youtube" 
                            className={`flex items-center gap-3 p-2 rounded-md transition 
                                ${location.pathname === "/youtube" ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            <IoLogoYoutube /> YouTube
                        </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/facebook" 
                            className={`flex items-center gap-3 p-2 rounded-md transition 
                                ${location.pathname === "/facebook" ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            <IoLogoFacebook /> Facebook
                        </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/instagram" 
                            className={`flex items-center gap-3 p-2 rounded-md transition 
                                ${location.pathname === "/instagram" ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            <BiLogoInstagramAlt /> Instagram
                        </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/tiktok" 
                            className={`flex items-center gap-3 p-2 rounded-md transition 
                                ${location.pathname === "/tiktok" ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            <AiFillTikTok /> TikTok
                        </Link>
                    </li>

                    <li onClick={() => setOpen(false)}>
                        <Link 
                            to="/profile" 
                            className="flex items-center gap-3 p-2 rounded-md text-gray-700">
                            <RiAccountCircleFill /> Profile
                        </Link>
                    </li>

                </ul>
            </div>
        </>
    );
}

export default Header;
