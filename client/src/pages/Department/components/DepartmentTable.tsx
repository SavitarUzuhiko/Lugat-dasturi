import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';
import type { DictionaryData } from '@/app/api/dictionaryApi/types';
import type { Data } from '@/app/api/departmentApi/types';
import { Button } from '@/components/ui/button';
import { Dropdown } from './DropDown';

type Props = {
  data: Data[];
  onDelete: (id: string) => void;
};

export function DepartmentTable({ data, onDelete}: Props) {
  return (
    <Table className='mt-15'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px] text-center bg-yellow-500'>T/R</TableHead>
          <TableHead className='text-center bg-green-500'>Nomi</TableHead>
          <TableHead className='text-center bg-red-500'>Tegishli lug&#39;at nomi</TableHead>
          <TableHead className='text-center bg-red-500'>Rasm</TableHead>
          <TableHead className='text-center bg-orange-500'>Kategoriya qo'shish</TableHead>
          <TableHead className='text-center bg-blue-500'>Yana</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((dict, idx) => (
          <TableRow key={dict._id}>
            <TableCell className='font-medium text-center'>{idx + 1}</TableCell>

            <TableCell className='text-center'>{dict.name}</TableCell>

            <TableCell className='text-center'>
              {(dict.dictionary as DictionaryData)?.word || '—'}
            </TableCell>

            <TableCell className='text-center'>
              {dict.image ? (
                <img className='w-20 mx-auto' src={dict.image} alt={dict.name} />
              ) : (
                '—'
              )}
            </TableCell>

            <TableCell className='text-center'>
              <Button variant="default">Kategoriya qo'shish</Button>
            </TableCell>

            <TableCell className='text-center'>
              <Dropdown data={dict} deleteFn={onDelete}>
                <Ellipsis className='w-4 h-4 mx-auto cursor-pointer' />
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
