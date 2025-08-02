import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { Combobox } from './components/Combobox';
import { Modal } from '@/components/common/Modal';
import { Plus } from 'lucide-react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import type { createDepartmentReq, Data } from '@/app/api/departmentApi/types';
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDictionaryQuery,
  useLazyGetDepartmentsQuery,
  useUploadMutation,
} from '@/app/api';
import { useEffect, useState } from 'react';
import type { DictionaryData } from '@/app/api/dictionaryApi/types';
import { DepartmentTable } from './components/DepartmentTable';

export const Department = () => {
  const [uploadFile, { isLoading }] = useUploadMutation();
  const { data: dictionary } = useGetDictionaryQuery({ type: '' });

  const [getDepartment, { data: department }] = useLazyGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [deleteDept] =useDeleteDepartmentMutation();
  const [imagePath, setImagePath] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getDep() {
      await getDepartment({ dict: '' });
    }
    getDep();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      name: '',
      dictionary: '',
      image: '',
    },
  });

  console.log('Dep', department);

  const sendDepartment = async (data: Data) => {
    try {
      const req: createDepartmentReq = {
        name: data.name,
        dictionary: data.dictionary,
        image: imagePath,
      };

      console.log(req);

      const { success } = await createDepartment(req).unwrap();
      if (success) {
        toast.success("Lug'at qo'shildi");
        reset();
        setImagePath('');
        setOpen(false);
        await getDepartment({ dict: '' });
      }
    } catch {
      toast.error('Xatolik yuz berdi');
    }
  };

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

  const selectTypes = async (word: string) => {
    if (word === 'All') word = '';
    const result = dictionary?.data.find((item) => item.word === word);
    if (result)
      return dictionary?.data && (await getDepartment({ dict: result._id }));
  };

  const sendTypes = (word: string) => {
    const result = dictionary?.data.find((item) => item.word === word);
    reset({
      dictionary: result?._id,
    });
  };

  const deleteDepartment = async (id: string) => {
    const { success } = await deleteDept({ _id: id }).unwrap();
    if (success) {
      toast.success('Dictionary deleted Successfully');
      await getDepartment({ dict: '' });
      return;
    }
    toast.error('Dictionary error');
  };

  return (
    <main className='p-15 pb-10'>
      <Toaster />
      <nav className='flex justify-between items-center'>
        <div>
          <Label className='mb-3 ml-3'>Lug&apos;atlar ro&apos;yhati</Label>
          {dictionary && dictionary.data && (
            <Combobox
              fn={selectTypes}
              boxWidth={'w-60'}
              data={[
                { word: 'All', status: 'All', _id: '0' } as DictionaryData,
                ...dictionary.data,
              ]}
            />
          )}
        </div>
        <Modal
          trigger={
            <Button variant={'default'}>
              <Plus /> Yangi bo&#39;lim qo&#39;shish
            </Button>
          }
          send={handleSubmit(sendDepartment)}
          open={open}
          onOpenChange={setOpen}
          loader={isLoading}
        >
          <DialogHeader>
            <DialogTitle className='font-bold'>
              Yangi bo&#39;lim qo'shish
            </DialogTitle>
          </DialogHeader>

          <div className='grid gap-4'>
            <>
              <div className='grid gap-3'>
                <Label htmlFor='name'>Bo&apos;lim nomi</Label>
                <Input
                  id='name'
                  placeholder='Taomlar'
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

              <div className='grid gap-3'>
                <Label htmlFor='definition'>Tavsif (ixtiyoriy)</Label>
                {dictionary && dictionary.data && (
                  <Combobox
                    fn={sendTypes}
                    boxWidth='w-94'
                    data={dictionary.data}
                  />
                )}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='file'>Fayl (ixtiyoriy)</Label>
                <Input id='file' type='file' onChange={handleFileChange} />
              </div>
            </>
          </div>
        </Modal>
      </nav>
      {dictionary && dictionary.data && (
        <DepartmentTable data={department?.data || []} onDelete={deleteDepartment} />
      )}
    </main>
  );
};
