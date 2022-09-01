import cn from 'classnames';

import { Menu } from '../index';
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Menu />
    </div>
  );
};

export default Sidebar;
