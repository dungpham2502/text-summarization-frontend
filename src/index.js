import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextSummarization from './pages/TextSummarization';
import ParagraphGenerator from './pages/ParagraphGenerator';
import SignUp from './pages/Signup';
import Footer from './components/Footer';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/summarize' element={
          <ProtectedRoute><TextSummarization /></ProtectedRoute>
        }/>
        <Route path='/generate' element={
          <ProtectedRoute><ParagraphGenerator /></ProtectedRoute>
        }/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/history' element={
          <ProtectedRoute><History /></ProtectedRoute>
        }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
