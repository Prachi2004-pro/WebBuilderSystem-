import React from 'react'
import { CgTemplate } from "react-icons/cg";
import { SiSimplelogin } from "react-icons/si";
import { GiCardPick } from "react-icons/gi";
import { RiLiveFill } from "react-icons/ri";
import { SiCloudflarepages } from "react-icons/si";

const FeatureSection = () => {
    const FeaturesData = [
    {
      logo:<SiSimplelogin />,
      title: "Login Based",
      para: "A secure login system that lets users save, manage, and return to their landing pages anytime",
    },
    {
      logo:<CgTemplate />,
      title: "Multiple Templates",
      para: "Pre-designed modern templates that give users a quick and professional starting point for their landing page.",
    },
    {
      logo:<GiCardPick />,
      title: "Section Picker",
      para: "A flexible section picker that allows users to include only the parts they need, like Hero, About, Services, or Testimonials",
    },
    {
      logo:<RiLiveFill />,
      title: "Live Preview",
      para: "A real-time live preview that updates instantly as users customize their content, ensuring a smooth WYSIWYG experience.",
    },
    {
      logo:<SiCloudflarepages />,
      title: "Instant Hosting",
      para: "One-click instant hosting that publishes the landing page online and generates a shareable live link immediately.",
    },
  ];
  return (
    <div className='flex flex-col gap-5 mb-8'>
        <h1 className='text-5xl text-center font-bold text-black'>
            Explore Our Amazing Features!
        </h1>
        <div className='flex justify-center gap-10 m-14'>
            {FeaturesData.map((blog,index) => (
            <div
            key={index}
              className={`bg-blue-600 flex flex-col justify-center items-center gap-4 text-center text-white p-5 shadow-gray-500 rounded-xl w-96 h-fit 
                ${index % 2 == 0 && "mt-60"}`}
            >
                <p className='bg-blue-400 border-blue-300 hover:bg-blue-300 rounded-full p-4 text-3xl'>{blog.logo}</p>
                <h1 className='text-2xl font-bold'>{blog.title}</h1>
                <p className='text-sm text-gray-300'>{blog.para}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default FeatureSection