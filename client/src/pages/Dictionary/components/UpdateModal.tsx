import { useGetDictionaryQuery, useUpdateDictionaryMutation, useUploadMutation } from '@/app/api';
import type { DictionaryData } from '@/app/api/dictionaryApi/types';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  children: ReactNode;
  data: DictionaryData;
};

export function UpdateModal({ children, data }: Props) {
  const [uploadFile, { isLoading }] = useUploadMutation();
  const [updateDictionary] = useUpdateDictionaryMutation();
  const {refetch} = useGetDictionaryQuery({});

  const [open , setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<DictionaryData>({
    defaultValues: {
      word: '',
      definition: '',
      status: '',
      image: '',
      _id: '',
    },
  });

  useEffect(() => {
    reset({
      word: data.word,
      definition: data.definition,
      status: data.status,
      image: data.image,
      _id: data._id,
    });
  }, [data, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadFile(formData).unwrap();
      toast.success('Fayl yuklandi');
      console.log(response);
      if (response.filePath)
        setValue('image' as keyof DictionaryData, response.filePath);
    } catch (error) {
      toast.error('Fayl yuklanmadi');
    }
  };

  const SubmitHandler = async (formData: DictionaryData) => {
    console.log('Form Submitted:', formData);

    const { success } = await updateDictionary(formData).unwrap();

    if (success) {
      toast.success('Form updated successfully');
      setOpen(false)
      window.location.reload()
      return
    }
    toast.error('Form updated error')
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
            {/* Radio tanlov */}
            <div className='grid gap-3 my-2'>
              <Label>
                Qo&apos;shmoqchi bo&apos;lgan lug&apos;at turini tanlang
              </Label>
              <Controller
                name='status'
                control={control}
                rules={{ required: 'Turini tanlang' }}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem value='historical' id='r1' />
                      <Label htmlFor='r1'>Tarixiy lug&apos;at</Label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem value='futuristic' id='r2' />
                      <Label htmlFor='r2'>Zamonaviy lug&apos;at</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.status && (
                <p className='text-red-500 text-sm'>{errors.status.message}</p>
              )}
            </div>

            {/* Word */}
            <div className='grid gap-3'>
              <Label htmlFor='name'>Lug&apos;at nomi</Label>
              <Input
                id='name'
                placeholder="Misol: O'z lug'at"
                {...register('word', {
                  required: "Lug'at nomini kiriting",
                  minLength: {
                    value: 2,
                    message: "Kamida 2 harf bo'lishi kerak",
                  },
                })}
                className={errors.word && 'focus-visible:ring-red-400'}
              />
              {errors.word && (
                <p className='text-red-500 text-sm'>{errors.word.message}</p>
              )}
            </div>

            {/* Definition */}
            <div className='grid gap-3'>
              <Label htmlFor='definition'>Tavsif (ixtiyoriy)</Label>
              <Textarea
                id='definition'
                placeholder='Tavsif yozing ...'
                {...register('definition')}
              />
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
