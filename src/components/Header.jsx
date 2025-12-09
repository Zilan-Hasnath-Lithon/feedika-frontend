import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillTikTok } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";

const Header = () => {
    const location = useLocation();

    return (
        <div className='py-3 md:py-1 shadow-sm fixed top-0 left-0 w-full z-50 bg-white'>
            <div className='mx-4 md:mx-18 flex items-center justify-between'>
                <div>
                    <h1 className="text-[25px] md:text-[34px] font-extrabold cursor-pointer text-blue-700">
                        <Link to="/">feedika</Link>
                    </h1>
                </div>

                <div>
                    <ul className='flex items-center gap-x-6 md:gap-x-16 text-[22px] md:text-[30px]'>
                        <li className={`cursor-pointer pb-1 border-b-2 ${location.pathname === "/" ? "border-blue-500" : "border-transparent"}`}>
                            <Link to="/"><FaHome /></Link>
                        </li>
                        <li className={`cursor-pointer pb-1 border-b-2 ${location.pathname === "/youtube" ? "border-blue-500" : "border-transparent"}`}>
                            <Link to="/youtube"><IoLogoYoutube /></Link>
                        </li>
                        <li className={`cursor-pointer pb-1 border-b-2 ${location.pathname === "/facebook" ? "border-blue-500" : "border-transparent"}`}>
                            <Link to="/facebook"><IoLogoFacebook /></Link>
                        </li>
                        <li className={`cursor-pointer pb-1 border-b-2 ${location.pathname === "/instagram" ? "border-blue-500" : "border-transparent"}`}>
                            <Link to="/instagram"><BiLogoInstagramAlt /></Link>
                        </li>
                        <li className={`cursor-pointer pb-1 border-b-2 ${location.pathname === "/tiktok" ? "border-blue-500" : "border-transparent"}`}>
                            <Link to="/tiktok"><AiFillTikTok /></Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className='flex items-center text-[26px] md:text-[33px]'>
                        <li className='cursor-pointer'>
                            <Link to="/profile"><RiAccountCircleFill /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
