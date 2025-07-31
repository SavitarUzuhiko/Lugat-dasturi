import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/app/api';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, token } = await login({ email, password }).unwrap();

    if (token) localStorage.setItem('token', token);

    if (success) navigate('/');
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md shadow-2xl gap-4'>
        <div>
          <div className='mx-6 flex justify-between items-center'>
            <p className='font-bold text-xl'>Kirish</p>
            <p
              className='font-semibold hover:underline cursor-pointer'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </p>
          </div>
          <CardTitle className='mx-6 my-1.5 font-semibold'>
            Tizimga kirish uchun email va parolni kiriting
          </CardTitle>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-2'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pr-10'
                />
                <span
                  className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
