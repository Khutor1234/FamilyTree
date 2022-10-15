import cn from 'classnames';
import { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { format } from 'date-fns';

import { IUserFact } from '../../interfaces';
import { FactsListProps } from './props';
import styles from './index.module.scss';

const FactsList = ({
  addToList,
  defaultFacts,
  className,
}: FactsListProps): JSX.Element => {
  const [year, setYear] = useState('');
  const [event, setEvent] = useState('');
  const [facts, setFacts] = useState<IUserFact[]>(defaultFacts);
  const [warning, setWarning] = useState(false);

  const addFact = () => {
    if (year && event) {
      setWarning(false);
      setFacts([
        ...facts,
        {
          year: year,
          text: event,
          id: '' + new Date().getTime(),
        },
      ]);
      setEvent('');
      setYear('');
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    addToList(facts);
    setWarning(false);
  }, [facts]);

  useEffect(() => {
    setWarning(false);
  }, [year, event]);

  return (
    <div className={cn(styles.facts, className)}>
      <div className={styles.factsList}>
        <div className={styles.label}>Короткі факти:</div>
        {facts.map((el) => (
          <div key={el.id} className={styles.fact}>
            {el.text}({format(new Date(el.year), 'yyyy')}р.)
            <div
              className={styles.delete}
              onClick={() =>
                setFacts(facts.filter((fact) => fact.id !== el.id))
              }
            >
              <TiDelete size="20px" />
            </div>
            ;
          </div>
        ))}
      </div>
      <div className={styles.form}>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={cn(
            styles.input,
            styles.year,
            warning && !year && styles.warning
          )}
          placeholder="Рік"
        />
        <input
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className={cn(styles.input, warning && !event && styles.warning)}
          placeholder="Подія"
        />
        <div className={styles.plus} onClick={() => addFact()}>
          <BsPlusLg size="20px" />
        </div>
      </div>
    </div>
  );
};

export default FactsList;
