import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Login, Sidebar, SignUp , Dictionary, Department, Category, Word} from './pages';

const App = () => {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === '/login' ||
        location.pathname === '/signup'
          ? ''
          : 'h-screen w-screen grid grid-cols-[250px_1fr] bg-gray-100'
      }
    >
      {location.pathname === '/login' ||
      location.pathname === '/signup' ? (
        ''
      ) : (
        <Sidebar />
      )}

      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/dictionary' replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/department' element={<Department />} />
          <Route path='/category' element={<Category />} />
          <Route path='/words' element={<Word />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
