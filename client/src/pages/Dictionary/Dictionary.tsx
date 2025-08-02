import {
  useCreateDictionaryMutation,
  useDeleteDictionaryMutation,
  useGetDictionaryQuery,
  useUploadMutation,
} from '@/app/api';
import type { CreateDictionaryReq, FormInputs } from '@/app/api/dictionaryApi/types';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { TableData } from './components/DictionaryTable';

export const Dictionary = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [postDictionary] = useCreateDictionaryMutation();
  const [uploadFile, { isLoading }] = useUploadMutation();
  const [deleteDict] = useDeleteDictionaryMutation();
  const [imagePath, setImagePath] = useState('');
  const [search, setSearch] = useState('');
  const { data, refetch: getDictionary } = useGetDictionaryQuery({
    search,
    type: checked ? 'historical' : 'futuristic',
  });

  useEffect(() => {
    const fetchData = async () => {
      await getDictionary().unwrap();
    };
    fetchData();
  }, [search, checked]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      word: '',
      definition: '',
      status: '',
      image:''
    },
  });

  const status = useWatch({ control, name: 'status' });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadFile(formData).unwrap();
      setImagePath(response.filePath);
      toast.success('Fayl yuklandi');
    } catch (error) {
      toast.error('Fayl yuklanmadi');
    }
  };

  const sendDictionary = async (data: FormInputs) => {
    try {
      const req: CreateDictionaryReq = {
        word: data.word,
        definition: data.definition || '',
        status: data.status,
        image: imagePath,
      };

      const { success } = await postDictionary(req).unwrap();
      if (success) {
        toast.success("Lug'at qo'shildi");
        reset();
        setImagePath('');
        setOpen(false);
        await getDictionary();
      }
    } catch {
      toast.error('Xatolik yuz berdi');
    }
  };

  const deleteDictionary = async (id: string) => {
    const { success } = await deleteDict({ id }).unwrap();
    if (success) {
      toast.success('Dictionary deleted Successfully');
      await getDictionary();
      return;
    }
    toast.error('Dictionary error')
  };

  return (
    <main className='p-15 pb-10'>
      <Toaster />
      <nav className='flex justify-between'>
        <div className='flex gap-2'>
          <Button
            variant={checked ? 'default' : 'outline'}
            onClick={() => setChecked(true)}
          >
            Tarixiy lug'atlar
          </Button>
          <Button
            variant={!checked ? 'default' : 'outline'}
            onClick={() => setChecked(false)}
          >
            Zamonaviy lug'atlar
          </Button>
        </div>

        <div className='flex gap-2'>
          <Input
            placeholder='Qidiruv'
            className='w-100 shadow-lg border-2 border-gray-300'
            onChange={(e) => setSearch(e.target.value)}
          />

          <Modal
            trigger={
              <Button variant={'default'}>
                <Plus /> Yangi qo&#39;shish
              </Button>
            }
            send={handleSubmit(sendDictionary)}
            open={open}
            onOpenChange={setOpen}
            loader={isLoading}
          >
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
                  <p className='text-red-500 text-sm'>
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Qolgan inputlar faqat status tanlanganda chiqadi */}
              {status && (
                <>
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
                      <p className='text-red-500 text-sm'>
                        {errors.word.message}
                      </p>
                    )}
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='definition'>Tavsif (ixtiyoriy)</Label>
                    <Textarea
                      id='definition'
                      placeholder='Tavsif yozing ...'
                      {...register('definition')}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='file'>Fayl (ixtiyoriy)</Label>
                    <Input id='file' type='file' onChange={handleFileChange} />
                  </div>
                </>
              )}
            </div>
          </Modal>
        </div>
      </nav>
      {data && data.data && <TableData onDelete={deleteDictionary} data={data.data} />}
    </main>
  );
};
