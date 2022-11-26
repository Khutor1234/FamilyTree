import { LoginProps } from "./props";
import styles from "./index.module.scss";

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
