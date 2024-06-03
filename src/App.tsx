
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Register from './components/Register';
import  Login  from './components/Login';
import Dashboardchat from './components/Dashboardchat';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Reactrouter from './components/Reactrouter';

function App() {
  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path='/' element={<Navbar />}>
            {/* protected router using react router */}
            <Route element={<Reactrouter/>}>
                <Route path="/dashboard" element={<Dashboardchat/>}/>
                <Route path="/chats" element={<Chat/>}/>
            </Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
          </Route>

          {/* Protected route without Navbar */}
          <Route element={<Reactrouter />}>
          <Route path="/chatbot" element={<Chatbot />} />
          </Route>

          <Route path="/home" element={<Home/>}/>
         
        

        </Routes>
      </Router>
    </div>
  );
}

export default App;
