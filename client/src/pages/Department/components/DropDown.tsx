import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil, Trash } from "lucide-react"
import type { Data } from '@/app/api/departmentApi/types';
import { UpdateModal } from "./UpdateModal";


type Props = {
  children: React.ReactNode;
  data: Data;
  deleteFn: (id: string) => void;
};

export function Dropdown({children,data,deleteFn}:Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-10' align='center'>
        <DropdownMenuGroup>
          <UpdateModal props_data={data}>
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
            onClick={() => deleteFn(data._id as string)}
            className='border-none cursor-pointer w-full'
          >
            <Trash className='text-red-500' /> O&apos;chirish
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
