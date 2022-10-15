import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onChange: (e?: any) => void;
  changetDate?: Date | null;
}
