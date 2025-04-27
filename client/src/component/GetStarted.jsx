import React from "react";

const GetStarted = () => {
  return (
    <section id="get-started" className="w-full flex justify-center py-16 px-4">
      <div className="w-full max-w-7xl flex justify-center">
        <div className="flex flex-col items-center gap-6 bg-[#4161df] p-8 rounded-lg border-4 border-[#5d77d6] text-center w-full">
          <span className="text-white font-semibold text-2xl">Get started with Homyz</span>
          <span className="text-white/70 text-base">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon
          </span>
          <a
            href="mailto:devashishchauhan07@gmail.com"
            className="bg-blue-00 text-white font-semibold py-2 px-6 rounded-lg border-2 border-white shadow-md hover:bg-white hover:text-[#5a73d7] transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
