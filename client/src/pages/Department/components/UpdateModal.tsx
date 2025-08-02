import { useGetDictionaryQuery, useUpdateDepartmentMutation, useUploadMutation } from '@/app/api';
import type { Data, updateDepartmentReq } from '@/app/api/departmentApi/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Combobox } from './Combobox';
import type { DictionaryData } from '@/app/api/dictionaryApi/types';

type Props = {
  children: ReactNode;
  props_data: Data;
};

export function UpdateModal({ children, props_data }: Props) {
  const [uploadFile, { isLoading }] = useUploadMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const { data: dictionary } = useGetDictionaryQuery({ type: '' });

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<updateDepartmentReq>();

  useEffect(() => {
    reset({
      _id: props_data._id,
      name: props_data.name,
      dictionary: props_data.dictionary,
      image: props_data.image || '',
    });
  }, [props_data, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadFile(formData).unwrap();
      toast.success('Fayl yuklandi');
      console.log("Image uploaded",response);
      if (response.filePath) setValue('image', response.filePath);
    } catch (error) {
      toast.error('Fayl yuklanmadi');
    }
  };

  const SubmitHandler = async (formData: updateDepartmentReq) => {
    console.log('Form Submitted:', formData);

    const { success } = await updateDepartment(formData).unwrap();

    if (success) {
      toast.success('Form updated successfully');
      setOpen(false);
      window.location.reload();
      return;
    }
    toast.error('Form updated error');
  };

  const sendTypes = (word: string) => {
    const result = dictionary?.data.find((item) => item.word === word);
    reset({
      dictionary: result?._id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(SubmitHandler)} className='space-y-4'>
          <DialogHeader>
            <DialogTitle className='font-bold'>
              Yangi Lug'at qo'shish
            </DialogTitle>
          </DialogHeader>

          <div className='grid gap-4'>
            {/* Word */}
            <div className='grid gap-3'>
              <Label htmlFor='name'>Lug&apos;at nomi</Label>
              <Input
                id='name'
                placeholder="Misol: O'z lug'at"
                {...register('name', {
                  required: "Bo'lim nomini kiriting",
                  minLength: {
                    value: 2,
                    message: "Kamida 2 harf bo'lishi kerak",
                  },
                })}
                className={errors.name && 'focus-visible:ring-red-400'}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>

            {/* Definition */}
            <div className='grid gap-3'>
              <Label htmlFor='definition'>Tavsif (ixtiyoriy)</Label>
              <Combobox fn={sendTypes} boxWidth='w-94' data={dictionary?.data as DictionaryData[]} selected={(props_data.dictionary as DictionaryData).word} {...register('dictionary')} />
            </div>

            {/* File Upload */}
            <div className='grid gap-3'>
              <Label htmlFor='file'>Fayl (ixtiyoriy)</Label>
              <Input id='file' type='file' onChange={handleFileChange} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Bekor qilish
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isLoading}>
              Saqlash
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
