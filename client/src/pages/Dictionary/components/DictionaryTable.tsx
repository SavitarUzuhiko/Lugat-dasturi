import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ellipsis } from 'lucide-react';
import { DropDown } from './DropDown';
import type { GetDictionaryRes } from '@/app/api/dictionaryApi/types';

type Props = {
  data: GetDictionaryRes['data'];
  onDelete: (id: string) => void;
};

export function TableData({ data, onDelete }: Props) {
  return (
    <Table className='mt-15'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px] text-center bg-yellow-500'>T/R</TableHead>
          <TableHead className='w-[55%] text-center bg-green-500'>Nomi</TableHead>
          <TableHead className='w-[28%] text-center bg-red-500'>Rasm</TableHead>
          <TableHead className='w-[10%] text-center bg-blue-500'>Yana</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((dict, idx) => (
          <TableRow key={dict._id}>
            <TableCell className='font-medium text-center'>{idx + 1}</TableCell>
            <TableCell className='text-center'>{dict.word}</TableCell>
            <TableCell className='text-center'>
              <img className='w-20 mx-auto' src={dict.image} alt={dict.word} />
            </TableCell>
            <TableCell>
              <DropDown data={dict} deleteFn={onDelete}>
                <Ellipsis className='w-4 h-4 mx-auto' />
              </DropDown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
