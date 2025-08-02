import type { DictionaryData } from '@/app/api/dictionaryApi/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { UpdateModal } from '@/pages/Dictionary/components/UpdateModal';

type Props = {
  children: React.ReactNode;
  data: DictionaryData;
  deleteFn: (id: string) => void;
};

export function DropDown({ children, data, deleteFn }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-10' align='center'>
        <DropdownMenuGroup>
          <UpdateModal data={data}>
            <Button
              variant={'outline'}
              className='border-none cursor-pointer w-full'
            >
              <Pencil /> O&apos;zgartirish
            </Button>
          </UpdateModal>

          <DropdownMenuSeparator />
          <Button
            variant={'outline'}
            onClick={() => deleteFn(data._id)}
            className='border-none cursor-pointer w-full'
          >
            <Trash className='text-red-500' /> O&apos;chirish
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
