import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CreateQuizForm from './pages/CreateQuizForm';

function App() {

    const token = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-quiz" element={<CreateQuizForm token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
