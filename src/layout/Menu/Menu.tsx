import cn from 'classnames';
import { AiOutlineCaretRight, AiFillCaretDown } from 'react-icons/ai';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { motion } from 'framer-motion';

import { countYears } from '../../utils';
import { MenuProps } from './Menu.props';
import styles from './Menu.module.scss';

const data = {
  name: 'Хуторна Олександра',
  born: 1999,
  country: 'Україна',
  facts: [
    {
      id: 1,
      year: 1999,
      text: 'Народжена',
    },
    {
      id: 2,
      year: 2005,
      text: 'Пішла в садочок',
    },
    {
      id: 3,
      year: 2016,
      text: 'Закінчила школу',
    },
  ],
  relatives: [
    {
      id: 1,
      status: 'Мама',
      name: 'Хуторна Любов',
      born: 1974,
    },
    {
      id: 2,
      status: 'Тато',
      name: 'Хуторна Любов',
      born: 1974,
    },
  ],
};

const bDay = [
  {
    id: 1,
    date: '31.03.09',
    person: 'Хуторна Олександра',
  },
  {
    id: 2,
    date: '31.04.99',
    person: 'Хуторна Олександра',
  },
];

const menu = [
  {
    id: 1,
    variant: 1,
    name: 'Факти',
    type: 'facts',
  },
  {
    id: 2,
    variant: 2,
    name: 'Близькі родичі',
    type: 'relatives',
  },
  {
    id: 3,
    variant: 3,
    name: 'Дні народження',
    type: 'bDay',
  },
];

const Menu = ({ className, ...props }: MenuProps): JSX.Element => {
  const [open, setOpen] = useState<string[]>([]);

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: { opacity: 0, height: 0 },
  };

  const handleOpen = (type: string) => {
    if (open.find((el) => el === type)) {
      setOpen(open.filter((el) => el !== type));
    } else {
      setOpen([...open, type]);
    }
  };

  const renderMenuInside = (variant: number) => {
    switch (variant) {
      case 1:
        return data.relatives.map((el) => (
          <li key={el.id} className={styles.relativesList}>
            <div className={styles.image}>
              <CgProfile size="30px" />
            </div>
            <div className={styles.name}>{el.name}</div>
            <div className={styles.status}>
              {el.status}, {countYears(el.born)}р.
            </div>
          </li>
        ));

      case 2:
        return data.facts.map((el) => (
          <li className={styles.factsList} key={el.id}>
            <div className={styles.year}>{el.year}</div>
            <div className={styles.yearNow}>
              ({countYears(el.year, data.born)}p.)
            </div>
            <div className={styles.text}>{el.text}</div>
          </li>
        ));

      case 3:
        return bDay.map((el) => (
          <li className={styles.bDay} key={el.id}>
            <div className={styles.date}>{el.date}</div>
            <div className={styles.persone}>{el.person}</div>
          </li>
        ));
      default:
        return null;
    }
  };

  return (
    <div className={cn(className, styles.menu)} {...props}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <CgProfile size="60px" />
        </div>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.born}>
          {countYears(data.born)}роки({data.born}р.), {data.country}
        </div>
        <div className={styles.more}>
          Дізнатись більше
          <AiOutlineCaretRight size="14px" />
        </div>
      </div>

      {menu.map((el) => (
        <div key={el.id} className={styles.menuItem}>
          <div
            className={styles.menuHeader}
            onClick={() => handleOpen(el.type)}
          >
            {el.name} <AiFillCaretDown size="14px" />
          </div>
          <motion.ul
            layout
            variants={variants}
            initial={open.find((e) => e === el.type) ? 'visible' : 'hidden'}
            animate={open.find((e) => e === el.type) ? 'visible' : 'hidden'}
          >
            {renderMenuInside(el.variant)}
          </motion.ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;
