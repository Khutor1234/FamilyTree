import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TreeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logOut: () => void;
  getTree: () => void;
  tree: any;
}
