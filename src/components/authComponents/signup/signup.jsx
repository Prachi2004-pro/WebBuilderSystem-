"use client";
import React from 'react'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   console.log("Signup Data:", data);
  // }, [data]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Signup Data:", data);

    // API Call to backend signup endpoint can be added here
    try {
      let res = await axios.post("http://localhost:5000/users/signup", data)
      let resData = res.data;
      if (res.status === 201) {
        Cookies.set('auth_token', resData.token, { expires: 7 }); // Expires in 7 days
        setSuccess("Signup Successful!");
        window.location.href = "/dashboard"; // Redirect to dashboard
        setLoading(false);
      }else {
        setErrors("Signup failed. Please try again.");
        setLoading(false);
      }
    } catch (errors) {
      setErrors("An error occurred during signup. Please try again.");
      setLoading(false);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <h1>{loading ? "Loading..." : (success ? success : errors)}</h1>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <div className="m-4 text-center p-2">
          <h2 className="text-4xl font-bold">Sign Up</h2>
          <h6 className="text-gray-500 text-md ">
            Create a new account to get started
          </h6>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Username</label>
            <input
              className="w-full p-2 border rounded-lg"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              className="w-full p-2 border rounded-lg"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              className="w-full p-2 border rounded-lg"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Sign Up
          </button>

          <div className="text-gray-500 text-md text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-bold">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup