import React, { useEffect, useState } from 'react';
import { db } from '../config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../config/FirebaseConfig'; // Ensure auth is properly imported

const ChatHistory = () => {
    const [user, loading, error] = useAuthState(auth);
    const [messages, setMessages] = useState([]);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString("en-US", options);
    }


    useEffect(() => {
        if (loading) {
            console.log("Authentication loading...");
            return;
        }
        if (error) {
            console.error("Firebase auth error:", error);
            return;
        }
        if (!user) {
            console.log("No user logged in!");
            return;
        }

        const textsCollectionRef = collection(db, "output_texts");
        const q = query(textsCollectionRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, snapshot => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);
        }, err => {
            console.error("Failed to fetch messages:", err);
        });

    }, [user, loading, error]);

    return (
        <div className="bg-gray-100 mt-5 p-4 rounded-lg shadow-md max-w-4xl mx-auto">
            {messages.map(message => (
                <div key={message.id} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{message.title}</h4>
                    <span className="text-sm text-gray-500">
                        {message.createdAt.toDate && formatDate(message.createdAt.toDate())}
                    </span>
                    <p className="text-gray-700 mt-2">{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
