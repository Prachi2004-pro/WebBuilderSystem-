"use client";
import React, { Children } from "react";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { RiUserLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import { Code } from 'lucide-react'

export default function layout({ children }) {

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    setShowLogoutModal(true);

    // Clear cookies or local storage
    Cookies.remove("token");
    Cookies.remove("user");
    // Redirect to login page or perform other logout actions
    window.location.href = "/login"; // Redirect to login page
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    console.log("Logged out");
  };

  return (
    <div
    className={"h-22 w-full bg-[#242424] border-b border-[#505050]"}
    >
      <div className="pl-6 left-4 top-4 flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code size={22} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white p-6">
          WebBuilder
        </h1>
      </div>

      <div className="absolute top-4 right-6">
        {/* Admin Button */}
        <Button
          ref={buttonRef}
          onClick={toggleDropdown}
          className=" flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl focus:ring-blue-300 focus:ring-offset-1"
        >
          <RiUserLine/>
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
                role="menu"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user ? user.username : "Guest"}
              </p>
              <p className="ri-admin-fill text-xs text-gray-500">
                {user ? user.email : "Not logged in"}
              </p>
            </div>

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 mr-3 text-gray-500" />
              Logout
            </button>
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
