import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Data } from '@/app/api/departmentApi/types';
import type { Category, Department } from '@/app/api/baseApi/types';


type Props = {
  data:any[];
  boxWidth?:string;
  fn:(item:string) => void;
  selected?:string
}

export function ComboboxCategory({data,boxWidth,fn,selected}:Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  console.log("Category Combobox", data);

  React.useEffect(() => {
    if(!selected) return
    setValue(selected)
  }, [selected])

  console.log("Combobox department",data)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='justify-between'
          >
            {value
              ? data.find((framework) => framework.name === value)?.name
              : "Lug'atni tanlang"}
            <ChevronsUpDown className='opacity-50' />
          </Button>
      </PopoverTrigger>
      <PopoverContent className={boxWidth + ' p-0'}>
        <Command>
          <CommandInput placeholder='Search framework...' className='h-9' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data && data.map((framework) => {
                console.log(framework);
                return (
                <CommandItem
                  key={framework._id}
                  value={framework?.word}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    console.log(currentValue, 'currentValue');
                    setOpen(false);
                    fn(currentValue)
                  }}
                >
                  <p className='flex justify-between w-full'>{framework.word}</p>
                </CommandItem>
              )})}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
