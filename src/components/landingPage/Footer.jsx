"use client";
import React from 'react'
import {
  RiInstagramFill,
  RiPinterestFill,
  RiWhatsappFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className='text-black flex flex-col items-center justify-center gap-4 py-6 bg-blue-600 text-white'>
        <div className="text-4xl font-bold">
            <p>WebBuilder</p>
        </div>
        <ul className='flex gap-10 text-lg'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About Us</li>
            <li>Contact</li>
        </ul>
        <div className="flex gap-6">
            <div className="text-white bg-blue-400 border-blue-300 hover:bg-blue-300 rounded-full p-4 text-2xl">
               <RiInstagramFill />
            </div>
            <div className="text-white bg-blue-400 border-blue-300 hover:bg-blue-300 rounded-full p-4 text-2xl">
                <RiPinterestFill />
            </div>
            <div className="text-white bg-blue-400 border-blue-300 hover:bg-blue-300 rounded-full p-4 text-2xl">
                <RiWhatsappFill />
            </div>
        </div>
        <div className="text-center text-lg mt-2">
            <hr/>
            <p>Copyright @ 2026 WebBuilder - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer