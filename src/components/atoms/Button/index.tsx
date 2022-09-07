import classNames from 'classnames';

import { ButtonProps } from './props';
import styles from './index.module.scss';

const Button = ({
  className,
  text,
  onClick,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(styles.button, className)}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
