import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CreateQuizForm from './pages/CreateQuizForm';

function HideNavbar() {
    const location = useLocation();
    return (
        <>
            {location.pathname.toLowerCase() !== '/create-quiz' && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/create-quiz" element={<CreateQuizForm />} />
            </Routes>
        </>
    );
}
function App() {
    return (
        <Router>
        <HideNavbar/>
        </Router>
    );
}

export default App;
