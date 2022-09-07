import { LoginProps } from './Login.props';
import styles from './Login.module.scss';

const LoginPage = ({ logIn }: LoginProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => logIn()}>
        Ввійти з допомогою Google
      </button>
    </div>
  );
};

export default LoginPage;
