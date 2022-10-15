import cn from 'classnames';

import { Header, Footer, Sidebar } from './index';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.scss';

const Layout = ({ children, main = true }: LayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.mainWrapper, !main && styles.wrapper)}>
      {main ? (
        <>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <main className={styles.body}>{children}</main>
          <Footer className={styles.footer} />
        </>
      ) : (
        <>
          <main className={styles.body}>{children}</main>
          <Footer className={styles.footer} />
          <Header />
        </>
      )}
    </div>
  );
};

export default Layout;
