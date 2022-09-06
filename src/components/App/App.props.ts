import { IUser } from '../interfaces';

export interface AppProps {
  getUser: () => void;
  user: IUser;
}
