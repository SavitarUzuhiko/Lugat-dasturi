import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  Login,
  SignUp,
  Sidebar,
  Dictionary,
  Department,
  Category,
  Word,
} from './pages';

import useIdleTimer from './lib/useIdleTimer';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  useIdleTimer(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthPage) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, 60 * 60 * 1000);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !isAuthPage) {
      navigate('/signup');
    }
  }, [location.pathname, navigate]);

  return (
    <div
      className={
        isAuthPage
          ? ''
          : 'h-screen w-screen grid grid-cols-[250px_1fr] bg-gray-100'
      }
    >
      {!isAuthPage && <Sidebar />}

      <div className="overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dictionary" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/department" element={<Department />} />
          <Route path="/category" element={<Category />} />
          <Route path="/words" element={<Word />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
