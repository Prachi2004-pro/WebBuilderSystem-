import React from "react";
import Image from "next/image";
import { IoMdArrowForward } from "react-icons/io";

const Workflow = () => {
  return (
    <div >
      <h1 className="text-5xl text-center font-bold text-black">Workflow & Execution</h1>
      <div className="flex justify-around m-14">
        {/* Left Side */}
        <div className="flex flex-col justify-center gap-10">
          <h1 className="text-6xl font-bold w-2xl">
            Create a website in 3 easy steps!
          </h1>
          <div className="flex flex-col gap-8 text-4xl px-5">
            <p>1. Choose a Template</p>
            <p>2. Customise your Page</p>
            <p>3. Go Live</p>
          </div>
          <button className="flex gap-4 border border-amber-600 p-4 px-8 w-52 text-lg border-amber-400 hover:bg-[#F7BE38]/100 rounded-4xl bg-amber-300 text-black">
            Get Started
            <p className="font-bold text-2xl">
              <IoMdArrowForward />
            </p>
          </button>
        </div>
        {/* Right Side */}
        <div>
          <Image
            src="/workflow.jpg"
            alt="WorkFlow"
            width={550}
            height={10}
            className="rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Workflow;
