import React, { useState } from 'react';
import SaveButton from './SaveButton';
import { auth } from '../config/FirebaseConfig';

function TextGenerator({ apiUrl, actionName, actionDescription }) {
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [resultTitle, setResultTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const minTextLength = 30;

  const validateText = (text) => {
    if (!text.trim()) {
      return 'Please enter some text to proceed.';
    }
    if (text.trim().length < minTextLength) {
      return `Text too short for processing. Minimum required characters: ${minTextLength}.`;
    }
    return '';
  }

    
  const handleSubmit = async () => {
    const validationResult = validateText(inputText);
    if (validationResult) {
      setError(validationResult);
      return;
    }
    setError('');
    setIsloading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ title: inputTitle, text: inputText }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setResultTitle(data.title);
      setResultText(data.generated_text || data.summary_text);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
      setResultText('');
      setResultTitle('');
    } finally {
      setIsloading(false);
    }
    }

  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex justify-center items-center p-4'>
      <div className="bg-white max-w-3xl w-full shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">{actionName}</h1>
        <p className="text-md mb-4 text-center text-gray-600">{actionDescription}</p>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
          <input 
            type="text" 
            value={inputTitle} 
            onChange={(e) => setInputTitle(e.target.value)} 
            placeholder="Enter title..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 text-lg"
          />
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here..."
            rows="10"
            className="w-full h-64 border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 text-lg resize-none"
          />
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start'}
          </button>
          {resultText && (
            <SaveButton title={resultTitle} content={resultText}/>
          )}
      </div>
      <div>
        <div className='text-gray-800 font-bold'>{resultTitle}</div>
        <div className="text-gray-800">
          {resultText || error}
        </div>
      </div>
      </div>
    </div>
  );
}


export default TextGenerator;
