import { Node, ExtNode } from 'relatives-tree/lib/types';
import { store } from '../store';

export interface ExtNodeAdditionally extends ExtNode {
  name?: string;
  surname?: string;
  born?: IUserBorn;
}

export interface NodeAdditionally extends Node {
  name?: string;
  surname?: string;
  born?: IUserBorn;
}

export interface IUser extends Node {
  surname: string;
  name: string;
  maidenName: string;
  email: string;
  live: boolean;
  fatherName: string;
  born: IUserBorn;
  now: IUserNow;
  facts: IUserFact[];
  died: IUserDied;
  social: IUserSocial;
}
interface IUserSocial {
  instagram: string;
  tel: string;
  telegram: string;
}

export interface IUserDied {
  city: string;
  country: string;
  date: Date;
  reason: string;
  place: string;
}

interface IUserNow {
  city: string;
  country: string;
}

export interface IUserBorn extends IUserNow {
  date: Date;
}

export interface IUserFact {
  id: string;
  text: string;
  year: string;
}

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
