import { CSSProperties } from 'react';

export interface RadioProps {
  val1: string;
  val2: string;
  onChange: (value: string) => void;
  className?: CSSProperties;
  defaultValue: string;
}
