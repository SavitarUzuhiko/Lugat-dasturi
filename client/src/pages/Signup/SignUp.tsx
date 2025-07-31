import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRegistrMutation } from '@/app/api';

const formSchema = z
  .object({
    email: z.string().email('Email is invalid'),
    password_1: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    password_2: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.password_1 === data.password_2, {
    path: ['password_2'],
    message: 'Passwords do not match',
  });

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [registr] = useRegistrMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password_1: '',
      password_2: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      password: values.password_1,
    }
    console.log(values);
    const {success} = await registr(data).unwrap();
    if(success)
      navigate('/');
    await toast.success('Gmailga kirib accountni aktivlashtiring!');
  }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-100'>
      <Toaster />
      <Card className='w-full max-w-sm shadow-2xl'>
        <div className='mx-6 flex justify-between items-center'>
          <p className='font-bold text-xl'>Sign Up</p>
          <p
            className='font-bold hover:underline cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Login
          </p>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='m@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password 1 with toggle */}
              <FormField
                control={form.control}
                name='password_1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parol</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword1 ? 'text' : 'password'}
                          placeholder='********'
                          {...field}
                          className='pr-10'
                        />
                        <span
                          className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500'
                          onClick={() => setShowPassword1((prev) => !prev)}
                        >
                          {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password 2 with toggle */}
              <FormField
                control={form.control}
                name='password_2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parolni qayta yozing</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword2 ? 'text' : 'password'}
                          placeholder='********'
                          {...field}
                          className='pr-10'
                        />
                        <span
                          className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500'
                          onClick={() => setShowPassword2((prev) => !prev)}
                        >
                          {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
