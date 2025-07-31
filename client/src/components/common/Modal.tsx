import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import type React from 'react';

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  send: () => void;
  open: boolean;
  loader?: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Modal({ trigger, children, send, open, onOpenChange , loader}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Bekor qilish</Button>
            </DialogClose>
            <Button type="submit" disabled={loader} onClick={send}>
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
