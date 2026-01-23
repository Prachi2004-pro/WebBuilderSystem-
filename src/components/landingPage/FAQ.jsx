"use client";
import Image from "next/image";
const FAQ = () => {
  return (
    <div className="flex flex-col gap-16 px-16 mb-8">
      <h1 className="text-5xl text-center font-bold text-black">
        Frequently Asked Questions
      </h1>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="border-b py-2">
            <h2 className="text-2xl font-semibold">What is WebBuilder?</h2>
            <p className="text-gray-600">
              WebBuilder is a platform that allows users to create stunning
              landing pages effortlessly using pre-designed templates and a
              user-friendly interface.
            </p>
          </div>
          <div className="border-b py-2">
            <h2 className="text-2xl font-semibold">
              How does the template system work?
            </h2>
            <p className="text-gray-600">
              Our template system provides a variety of modern designs that you
              can choose from. Simply select a template, customize it to your
              liking, and publish your page.
            </p>
          </div>
          <div className="border-b py-2">
            <h2 className="text-2xl font-semibold">
              Can I preview my page before publishing?
            </h2>
            <p className="text-gray-600">
              Yes! WebBuilder offers a live preview feature that allows you to
              see your changes in real-time as you edit your page.
            </p>
          </div>
        </div>

        <div>
          <Image
            src="/FAQ.png"
            alt="FAQ_Image"
            width={750}
            height={100}
            className="rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
