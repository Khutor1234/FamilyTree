import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../interfaces';

export interface TreeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logOut: () => void;
  getTree: () => void;
  tree: IUser[];
  isRequest: boolean | null;
  user: { id: string };
}
