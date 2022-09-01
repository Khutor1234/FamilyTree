import { Node, ExtNode } from 'relatives-tree/lib/types';

export interface ExtNodeAdditionally extends ExtNode {
  name?: string;
  surname?: string;
}

export interface NodeAdditionally extends Node {
  name?: string;
  surname?: string;
}
