import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';



const Navbar = () => {
    const [buttonState, setButtonState] = useState(false); 
    const [user, loading, error] = useAuthState(auth);

    const toggleButtonState = () => {
        setButtonState(!buttonState);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out sucessfully");
        } catch (err) {
            console.log("error logging out: ", err);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log("Firebase auth error", error);
        return <div>Error Loading User...</div>
    }

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">
                        <Link to="/">Project-Name</Link>
                    </div>
                    <div className="md:flex hidden space-x-6 items-center">
                        <Link to="/" className="text-md text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
                        <Link to="/generate" className="text-md text-gray-600 hover:text-blue-600 transition duration-300">Pargraph Generator</Link>
                        <Link to="/summarize" className="text-md text-gray-600 hover:text-blue-600 transition duration-300">Text Summarization</Link>
                        <Link to="/history" className="text-md text-gray-600 hover:text-blue-600 transition duration-300">History</Link>
                            <div>
                            {!user ? (
                                <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                    Signup
                                </Link>
                            ) : (
                                <div className="flex items-center">
                                    <span className="mr-4">{user.email}</span>
                                    <button
                                        onClick={logout}
                                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                            </div>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleButtonState} className="text-gray-600 focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={buttonState ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${buttonState ? 'block' : 'hidden'} flex flex-col absolute w-full bg-white shadow-md py-4`}>
                <Link to="/" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Home</Link>
                <Link to="/generate" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Pargraph Generator</Link>
                <Link to="/summarize" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Text Summarization</Link>
                <Link to="/history" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">History</Link>
                    <div className='flex items-center justify-center'>
                    {!user ? (
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ">
                            Signup
                        </Link>
                    ) : (
                        <div className="flex items-center">
                            <span className="mr-4">{user.email}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    </div>
            </div>
        </nav>
    );
};

export default Navbar;
