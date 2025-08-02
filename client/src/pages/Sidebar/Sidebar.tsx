import UserImage from '@/assets/user.png';
import { Button } from '@/components/ui/button';
import { BookUser, BookCopy, Blocks, Menu, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    setLabels(
      labels.map((l, i) =>
        i === labels.findIndex((l) => l.target === location.pathname)
          ? { ...l, checked: true } : { ...l, checked: false }
      )
    );
  }, [location.pathname]);
  const [labels, setLabels] = useState([
    {
      label: "Lug'at",
      icon: <BookCopy />,
      target: '/dictionary',
      checked: true,
    },
    {
      label: "Bo'limlar",
      icon: <Blocks />,
      target: '/department',
      checked: false,
    },
    {
      label: 'Kategoriyalar',
      icon: <Menu />,
      target: '/category',
      checked: false,
    },
    { label: "So'zlar", icon: <BookUser />, target: '/words', checked: false },
  ]);
  const navigate = useNavigate();
  return (
    <aside className='h-screen bg-gray-200 flex flex-col items-center'>
      <img
        src={UserImage}
        loading='lazy'
        className='rounded-full w-50'
        alt='User'
      />
      <div className='w-full px-3 my-5'>
        {labels.map((label, index) => (
          <Button
            key={index}
            variant='outline'
            className={
              'w-full justify-start gap-2 bg-gray-200 shadow-none' +
              (label.checked ? ' bg-primary-foreground' : '')
            }
            onClick={() => {
              navigate(label.target);
            }}
          >
            {label.icon}
            {label.label}
          </Button>
        ))}
        <Button
          variant='outline'
          className={
            'w-full justify-start bg-gray-200 gap-2 shadow-none hover:text-red-500'
          }
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          <LogOut />
          Chiqish
        </Button>
      </div>
    </aside>
  );
};
