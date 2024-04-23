import React from 'react';

const HeroSection = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-bold text-gray-900 ">
            SCoRe Lab Text Summarization
          </h1>
          <p className="mb-8 leading-relaxed">
            Transforming bullet points into well-crafted essays or paragraphs has never been easier. With our SCoRe Lab Text Summarization tool, you can effortlessly generate comprehensive summaries from your bullet points. Elevate your productivity and streamline your writing process with the power of AI at your fingertips.
          </p>
          <p className="mb-8 leading-relaxed">
             Whether you're managing personal projects or collaborating on team tasks, our SCoRe Lab Text Summarization tool adapts to your unique workflow needs. Simplify complex information, extract key insights, and focus on driving innovation and growth. Experience the future of text summarization today.
          </p>
          <div className="flex mt-6 justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="/logo_score_1.png" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
