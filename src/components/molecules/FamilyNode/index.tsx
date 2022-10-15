import { memo, useState } from 'react';
import classNames from 'classnames';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { ModalAdd } from '../../index';
import { FamilyNodeProps } from './props';
import styles from './index.module.scss';

export default memo<FamilyNodeProps>(function FamilyNode({
  className,
  node,
  isRoot,
  onSubClick,
  style,
  ...props
}) {
  const [modal, setModal] = useState(false);

  return (
    <div className={styles.root} style={style} title={node.id} {...props}>
      <ModalAdd node={node} modal={modal} close={() => setModal(false)} />
      <Link to={`/${node?.id}`}>
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot
          )}
        >
          <CgProfile size="40px" />
          <div className={styles.info}>
            <span>{node?.name && node.name}</span>
            <span>{node?.surname && node.surname}</span>
            {node.born?.date && (
              <div>{format(new Date(node.born?.date), 'yyyy')}р.</div>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.plus} onClick={() => setModal(true)}>
        <AiOutlinePlusCircle size="20px" />
      </div>
      {node.hasSubTree && (
        <div
          className={classNames(styles.sub, styles[node.gender])}
          onClick={() => onSubClick(node.id)}
        />
      )}
    </div>
  );
});
