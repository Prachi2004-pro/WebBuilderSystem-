"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Login Data:", data);

    // API Call to backend login endpoint can be added here
    try {
      let res = await axios.post("http://localhost:5000/users/login", data);
      let resData = res.data;
      // console.log("Response Data:", resData);
      if (res.status === 200) {
        // Store JWT Token in Cookies
        console.log("Login Success");
        Cookies.set("auth_token", resData.token, { expires: 7 }); // Expires in 7 days

        // ✅ USER DATA localStorage me (IMPORTANT)
        localStorage.setItem("user", JSON.stringify(resData.user));
        setSuccess("Login Successful! Redirecting...");
        window.location.href = "/dashboard"; // Redirect to dashboard
        setLoading(false);
      } 
      
      else {
        setErrors("Login failed. Please try again.");
        setLoading(false);
      }
      
    } catch (error) {
      setErrors("An error occurred during login. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4 flex flex-col gap-6">
      <h1>{loading ? "Loading..." : success ? success : errors}</h1>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <div className="m-4 text-center p-2">
          <h2 className="text-4xl font-bold">Login</h2>
          <h6 className="text-gray-500 text-md ">
            Sign in to your account to continue
          </h6>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>

          <div className="text-gray-500 text-md text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-bold">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
