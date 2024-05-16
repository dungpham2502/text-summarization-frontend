import { db, auth } from '../config/FirebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

const SaveButton = ({ title, content }) => {
    const [user, loading, error] = useAuthState(auth);
    const [isSaving, setIsSaving] = useState(false);
    
    const textsCollectionRef = collection(db, "output_texts");

    const handleSave = async () => {
        if (loading) return
        if (error) {
            console.log("Firebase auth error:", error);
            return;
        }
        if (!user) {
            console.log("No user logged in!")
            return;
        }
        setIsSaving(true);
        try {
            await addDoc(textsCollectionRef, {
                title: title,
                content: content,
                userId: user.uid,
                createdAt: new Date()
            })
        } catch (err) {
            console.error("Error adding document:", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            className={`mt-4 ${isSaving ? 'bg-green-300' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-6 rounded-lg shadow-lg`}
            onClick={handleSave}
            disabled={isSaving} 
        >
            {isSaving ? 'Saving...' : 'Save Output'}
        </button>
    );
};

export default SaveButton;
