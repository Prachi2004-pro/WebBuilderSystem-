import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex items-start justify-between bg-white w-auto h-auto gap-10 px-10 py-28">
      <div className="flex flex-col items-start justify-center gap-10">
        <div className="flex flex-col gap-4 text-6xl font-bold">
          <h1>Create Stunning Pages</h1>
          <h1>Effortlessly!</h1>
        </div>
        <p className="text-slate-500 text-2xl w-3xl">
          Our Platform lets you build responsive landing pages effortlessly by
          choosing templates, customize sections, preview in real-time, and
          publish instantly.
        </p>
        <Link href="/signup">
          <button className="flex gap-4 border border-amber-600 p-4 px-8 border-amber-400 hover:bg-[#F7BE38]/100 rounded-4xl bg-amber-300 text-black">
          Start Building
          <p className="text-center font-bold text-2xl">
            <IoMdArrowForward />
          </p>
        </button>
        </Link>
        
      </div>

      <div>
        <Image
          src="/heroImage.jpg"
          alt="Hero_Image"
          width={750}
          height={100}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Hero;
