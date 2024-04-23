import React from 'react';
import { useNavigate } from 'react-router-dom';

const Feature = ({ title, description, link }) => {
  let navigate = useNavigate();

  const handleLink = () => {
    navigate(`${link}`)
  }

  return (
    <div onClick={handleLink} className="bg-gray-100 p-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 cursor-pointer">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">App Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature 
            title="Generate Well-Crafted Paragraph" 
            description="Our AI model generate well-crafted and concise paragraph from bullet pints"
            link="generate"
          />
          <Feature 
            title="Condense Text Summarization" 
            description="Get instant and concise text summarization from our AI model" 
            link="summarize"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
