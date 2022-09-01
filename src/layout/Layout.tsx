import { Header, Footer, Sidebar } from './index';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.scss';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body}>{children}</main>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Layout;
