import cn from 'classnames';
import { format } from 'date-fns';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTelegramLine } from 'react-icons/ri';

import { FooterProps } from './Footer.props';
import styles from './Footer.module.scss';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>MyFamily © 2022 - {format(new Date(), 'yyyy')}</div>
      <a href="#" target="_blank">
        <IoLogoInstagram size="30px" />
      </a>
      <a href="#" target="_blank">
        <RiTelegramLine size="30px" />
      </a>
      <span>Хуторна Олександра</span>
    </footer>
  );
};

export default Footer;
