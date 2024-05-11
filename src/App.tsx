import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Layout/Navbar';
import UserProvider from './context/UserContext';
import Message from './components/Layout/Message';
import Profile from './pages/User/Profile/Profile';
import WorkspacesPage from './pages/Workspaces/Workspaces';

function App() {
    return (
        <Router>
            <UserProvider>
                <Navbar />
                <Message />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/profile" element={<Profile />} />
                    <Route path="/logout" element={<Navigate to="/" />} />
                    <Route path="/contact" element={<div>contact</div>} />
                    <Route path="/workspaces" element={<WorkspacesPage />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}

export default App;
