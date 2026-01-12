"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-around w-auto h-20 text-white bg-blue-600 ">
      <h1 className="text-4xl font-bold">WebBuilder</h1>
      <div className="flex flex-row gap-10 text-xl">
        <div>Home</div>
        <div>Features</div>
        <div>Templates</div>
        <div>Workflow</div>
      </div>
      <div className="flex flex-row gap-6 text-xl">
        <button
          onClick={() => router.push("/login")}
          className="border px-6 py-1 border-gray-300 rounded-3xl"
        >
          Login
        </button>
        <button
         onClick={() => router.push("/signup")}
         className="border px-6 py-1 border-gray-300 rounded-3xl">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Navbar;
