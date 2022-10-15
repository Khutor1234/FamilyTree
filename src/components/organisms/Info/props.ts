import { IUser } from '../../interfaces';

export interface InfoProps {
  id: string | undefined;
  tree: IUser[];
  logOut: () => void;
}
