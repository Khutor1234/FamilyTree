import { Node, ExtNode } from 'relatives-tree/lib/types';
import {store} from '../store'

export interface ExtNodeAdditionally extends ExtNode {
  name?: string;
  surname?: string;
}

export interface NodeAdditionally extends Node {
  name?: string;
  surname?: string;
}

export interface IUser {}


export type TState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch