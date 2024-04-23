import React, { useState } from 'react';

function TextGenerator({ apiUrl, actionName }) {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');

    const handleSubmit = async () => {
    try {
        const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResultText(data.generated_text || data.summary_text);
    } catch (error) {
        console.error('Error:', error);
        setResultText(`Error: ${error.message}`);
    }
    };

    return (
      <div className='min-h-screen w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex justify-center items-center p-4'>
        <div className="bg-white max-w-3xl w-full shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">{actionName}</h1>
          <div className="flex justify-center items-center mb-4">
            <input 
              type="text" 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              placeholder="Type here..."
              className="border border-gray-300 rounded-md px-4 py-2 mr-4 flex-grow focus:outline-none focus:border-blue-500"
            />
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow"
              onClick={handleSubmit}
            >
              Start
            </button>
          </div>
          <div className="text-gray-800">
            {resultText}
          </div>
        </div>
      </div>
      );
}

export default TextGenerator;
