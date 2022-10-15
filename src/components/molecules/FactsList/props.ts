import { CSSProperties } from 'react';
import { IUserFact } from '../../interfaces';

export interface FactsListProps {
  addToList: (facts: IUserFact[]) => void;
  className?: CSSProperties;
  defaultFacts: IUserFact[];
}
