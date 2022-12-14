import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IUser } from '../../components/interfaces';

export interface MenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user?: IUser;
  tree: IUser[];
}
