import cn from 'classnames';
import { useState, useEffect } from 'react';

import { RadioProps } from './props';
import styles from './index.module.scss';

const Radio = ({
  className,
  val1,
  val2,
  onChange,
  defaultValue,
}: RadioProps): JSX.Element => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className={cn(styles.radio, className)}>
      <label>
        <input
          type="radio"
          value={'val1'}
          checked={value === 'val1'}
          onChange={(e) => setValue(e.target.value)}
        />
        {val1}
      </label>

      <label>
        <input
          type="radio"
          value={'val2'}
          checked={value === 'val2'}
          onChange={(e) => setValue(e.target.value)}
        />
        {val2}
      </label>
    </div>
  );
};

export default Radio;
