import { IUser } from '../interfaces';

export interface AppProps {
  getUser: () => void;
  logIn: () => void;
  user: IUser;
}
