import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trash } from "lucide-react"
import type { Category } from "@/app/api/baseApi/types";


type Props = {
  children: React.ReactNode;
  data: Category;
  deleteFn: (id: string) => void;
};

export function Dropdown({children,data,deleteFn}:Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-10' align='center'>
        <DropdownMenuGroup>
          <Button
            variant={'outline'}
            onClick={() => {deleteFn(data._id as string);window.location.reload();}}
            className='border-none cursor-pointer w-full'
          >
            <Trash className='text-red-500' /> O&apos;chirish
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
