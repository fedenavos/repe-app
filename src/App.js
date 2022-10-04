import './App.css';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import FriendDashboard from './pages/FriendDashboard';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className='w-100 d-flex align-items-center justify-content-center'>
          <Router>
            <Routes>
              <Route path="/" index element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path='/friends' element={<FriendDashboard />}/>
              <Route path='*' element={ <Navigate replace to="/"/> }/>
            </Routes>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
