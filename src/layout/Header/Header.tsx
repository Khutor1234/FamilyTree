import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { GrMenu, GrClose } from 'react-icons/gr';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';

import { Menu } from '../index';
import { Button } from '../../components';
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
      <div className={styles.menuOpen}>
        <div className={styles.icon} onClick={() => setIsOpened(true)}>
          <BiMenuAltLeft size="30" />
        </div>
        <Button
          className={styles.logout}
          text="Вийти"
          onClick={() => {
            console.log('hii');
          }}
        />
      </div>

      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Menu />
        <div className={styles.menuClose} onClick={() => setIsOpened(false)}>
          <RiCloseLine size="30" />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
