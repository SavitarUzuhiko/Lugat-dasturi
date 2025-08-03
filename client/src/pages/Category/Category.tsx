import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, useWatch } from 'react-hook-form';
import { Ellipsis, Plus } from 'lucide-react';

import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useLazyGetDepartmentsQuery,
  useLazyGetDictionaryQuery,
} from '@/app/api';
import type { Department, Dictionary } from '@/app/api/baseApi/types';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Modal } from '@/components/common/Modal';

import { Combobox } from '../Department/components/Combobox';
import { ComboboxCategory } from './components/Combobox';
import type { DictionaryData } from '@/app/api/dictionaryApi/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dropdown } from './components/DropDown';

type CategoryForm = {
  name: string;
  dictionary: string;
  department: string;
};

export const Category = () => {
  const [getDepartments] = useLazyGetDepartmentsQuery();
  const [getDictionary, { data: dictionaries }] = useLazyGetDictionaryQuery();
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: {
      name: '',
      dictionary: '',
      department: '',
    },
  });

  const selectedDictId = useWatch({ control, name: 'dictionary' });
  const selectedDeptId = useWatch({ control, name: 'department' });

  const { data: categories } = useGetCategoriesQuery(
    {
      dict: selectedDictId || '',
      dep: selectedDeptId || '',
    },
    { skip: !selectedDictId }
  );

  useEffect(() => {
    getDictionary({ type: '' });
  }, [getDictionary]);

  const handleFormDictSelect = async (word: string) => {
    const selected = dictionaries?.data.find((item) => item.word === word);
    if (selected) {
      setValue('dictionary', selected._id);
      setValue('department', ''); // Reset department

      try {
        const res = await getDepartments({ dict: selected._id }).unwrap();
        const filtered = res.data?.filter(
          (dept) => (dept.dictionary as DictionaryData)._id === selected._id
        );
        setFilteredDepartments((filtered as Department[]) || []);
      } catch (error) {
        toast.error('Bo‘limlarni yuklashda xatolik');
      }
    }
  };

  const handleFormDepartmentSelect = (word: string) => {
    const selected = filteredDepartments.find((item) => item.name === word);
    if (selected) {
      setValue('department', selected._id as string);
    }
  };

  const onSubmit = async (data: CategoryForm) => {
    try {
      const { success } = await createCategory(data).unwrap();
      if (success) {
        toast.success("Bo'lim muvaffaqiyatli qo'shildi");
        reset();
        setOpen(false);
        setFilteredDepartments([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Xatolik yuz berdi');
    }
  };

  return (
    <main className="p-15 pb-10">
      <Toaster />

      {/* Selectors */}
      <nav className="flex flex-wrap gap-6 justify-between items-start">
        <div>
          <Label className="mb-3 ml-3">Lug&apos;atlar ro&apos;yxati</Label>
          {dictionaries?.data && (
            <Combobox data={dictionaries.data} fn={handleFormDictSelect} />
          )}
        </div>

        <div>
          <Label className="mb-3 ml-3">Bo&apos;limlar ro&apos;yxati</Label>
          {filteredDepartments.length > 0 ? (
            <ComboboxCategory
              data={filteredDepartments}
              fn={handleFormDepartmentSelect}
            />
          ) : (
            <p className="text-muted-foreground text-sm italic mt-2">
              Avval lug&#39;at tanlang
            </p>
          )}
        </div>

        {/* Modal */}
        <Modal
          trigger={
            <Button variant="default">
              <Plus className="mr-2" /> Yangi bo&#39;lim qo&#39;shish
            </Button>
          }
          send={handleSubmit(onSubmit)}
          open={open}
          onOpenChange={setOpen}
          loader={false}
        >
          <DialogHeader>
            <DialogTitle className="font-bold">Yangi bo&#39;lim qo&#39;shish</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Bo&apos;lim nomi</Label>
              <Input
                id="name"
                placeholder="Masalan: Taomlar"
                {...register('name', {
                  required: "Bo'lim nomini kiriting",
                  minLength: {
                    value: 2,
                    message: "Kamida 2 harf bo'lishi kerak",
                  },
                })}
                className={errors.name ? 'focus-visible:ring-red-400' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="dictionary">Lug'at tanlang</Label>
              {dictionaries?.data && (
                <Combobox
                  data={dictionaries.data}
                  fn={handleFormDictSelect}
                  boxWidth="w-94"
                />
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="department">Bo'lim tanlang</Label>
              {filteredDepartments.length > 0 ? (
                <ComboboxCategory
                  data={filteredDepartments}
                  fn={handleFormDepartmentSelect}
                  boxWidth="w-94"
                />
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  Avval lug‘at tanlang
                </p>
              )}
            </div>
          </div>
        </Modal>
      </nav>

      {/* Table */}
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">T/R</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead className="text-center">Bo'lim</TableHead>
              <TableHead className="text-center">Tegishli lug'at</TableHead>
              <TableHead className="text-right">Yana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data?.length ? (
              categories.data.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-center">
                    {(category.department as Department)?.name ?? '–'}
                  </TableCell>
                  <TableCell className="text-center">
                    {(category.dictionary as Dictionary)?.word ?? '–'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dropdown data={category} deleteFn={(id) => deleteCategory({_id:id})}>
                      <Ellipsis className='w-4 h-4 mx-auto cursor-pointer' />
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center italic py-4">
                  Kategoriyalar topilmadi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
