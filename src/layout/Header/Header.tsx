import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { GrMenu, GrClose } from 'react-icons/gr';

import { Menu } from '../index';
import { HeaderProps } from './Header.props';
import styles from './Header.module.scss';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <div className={styles.menuOpen} onClick={() => setIsOpened(true)}>
        <GrMenu />
      </div>

      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Menu />
        <div className={styles.menuClose} onClick={() => setIsOpened(false)}>
          <GrClose />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
