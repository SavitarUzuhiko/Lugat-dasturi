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
import type { DictionaryData } from '@/app/api/dictionaryApi/types';
import { Badge } from '@/components/ui/badge';


type Props = {
  data:DictionaryData[]
  boxWidth?:string;
  fn:(item:string) => void;
  selected?:string
}

export function Combobox({data,boxWidth,fn,selected}:Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(data[0].word);

  React.useEffect(() => {
    if(!selected) return
    setValue(selected)
  }, [selected])

  console.log("Combobox",data)

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
              ? data.find((framework) => framework.word === value)?.word
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
              {data && data.map((framework) => (
                <CommandItem
                  key={framework._id}
                  value={framework.word}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    fn(currentValue)
                  }}
                >
                  <p className='flex justify-between w-full'>{framework.word} <Badge variant={framework.status}>{framework.status}</Badge></p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
