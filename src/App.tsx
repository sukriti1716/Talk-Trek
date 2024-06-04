
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboardchat from './components/Dashboardchat';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Reactrouter from './components/Reactrouter';
import { useEffect, useState } from 'react';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div >

      {!location.pathname.includes('home') && !location.pathname.includes('chatbot') && <Navbar
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
      />}
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* protected router using react router */}
        <Route element={<Reactrouter setUserLoggedIn={setUserLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboardchat />} />
          <Route path="/chats" element={<Chat />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected route without Navbar */}
        <Route element={<Reactrouter setUserLoggedIn={setUserLoggedIn} />}>
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>

        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
