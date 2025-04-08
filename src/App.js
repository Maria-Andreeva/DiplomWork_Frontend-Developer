import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import BookingPage from './pages/BookingPage/BookingPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css';
import {ToastContainer} from "react-toastify";
import MyEvents from "./pages/MyEvents/MyEvents";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/my-events" element={<MyEvents />} />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route path="/booking" element={<BookingPage />} />
                    </Routes>
                </main>
                <ToastContainer />
            </AuthProvider>
        </Router>
    );
}

export default App;
