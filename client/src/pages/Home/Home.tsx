import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') navigate('/dictionary');
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [localStorage.getItem('token')]);
  return null;
};
