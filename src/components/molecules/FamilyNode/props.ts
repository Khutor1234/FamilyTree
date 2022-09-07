import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ExtNodeAdditionally } from '../../interfaces';

export interface FamilyNodeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  node: ExtNodeAdditionally;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style: React.CSSProperties;
}
