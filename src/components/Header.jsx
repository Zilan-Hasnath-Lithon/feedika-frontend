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
        <div className='py-3 md:py-2 shadow-md fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md'>
            <div className='mx-4 md:mx-18 flex items-center justify-between max-w-[1500px] mx-auto'>

                <div>
                    <h1 className="text-[28px] md:text-[36px] font-extrabold cursor-pointer text-blue-700 tracking-wide hover:text-blue-800 transition">
                        <Link to="/">feedika</Link>
                    </h1>
                </div>

                <div>
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

                <div>
                    <ul className='flex items-center text-[28px] md:text-[35px]'>
                        <li className='cursor-pointer hover:scale-110 transition'>
                            <Link to="/profile"><RiAccountCircleFill /></Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Header;
