import cn from 'classnames';

import { Menu } from '../index';
import { SidebarProps } from './props';
import styles from './index.module.scss';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Menu />
    </div>
  );
};

export default Sidebar;
