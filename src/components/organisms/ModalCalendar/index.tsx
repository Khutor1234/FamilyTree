import { useState } from 'react';
import { DatePicker } from 'react-responsive-datepicker';
import cn from 'classnames';
import 'react-responsive-datepicker/dist/index.css';
import { format } from 'date-fns';

import { Button } from '../../index';
import { ModalProps } from './props';
import styles from './index.module.scss';

const ModalCalender = ({
  onChange,
  changetDate,
  className,
  ...props
}: ModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(changetDate || null);
  console.log(date, 'date');
  return (
    <div className={cn(styles.calendar, className)} {...props}>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        text={date ? format(date, 'dd.MM.yyyy') : 'Дата'}
      />
      <DatePicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValue={new Date(2022, 8, 8)}
        dayNames={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']}
        monthNames={[
          'Січень',
          'Лютий',
          'Березень',
          'Квітень',
          'Травень',
          'Червень',
          'Липень',
          'Серпень',
          'Вересень',
          'Жовтень',
          'Листопад',
          'Грудень',
        ]}
        showTitle={false}
        headerFormat="DD, MM dd"
        colorScheme="#8DE4AF"
        onChange={(date) => {
          setDate(date);
          onChange(date);
        }}
        closeText="Ок"
        clearText="Очистити"
      />
    </div>
  );
};

export default ModalCalender;
