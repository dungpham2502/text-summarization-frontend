import { useState } from "react";
import { auth, googleProvider } from "../config/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        goToHomepage();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        goToHomepage();
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (err.code === 'auth/wrong-password') {
        setError('The password is invalid or the user does not have a password.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } 
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      goToHomepage();
    } catch(error) {
      console.error(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with the same email address but different sign-in credentials.');
    } else {
        setError('Failed to sign in with Google. Please try again.');
    }

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">{isSignUp ? "Sign Up" : "Sign In"}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth();
          }}
        >
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="text-red-500 text-sm mt-2">{error}</div>
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-900 w-full"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="px-6 py-2 mt-4 text-blue-600 hover:text-blue-800 w-full"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
