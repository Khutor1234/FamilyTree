import { memo } from 'react';
import classNames from 'classnames';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlusCircle } from 'react-icons/ai';

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
  return (
    <div className={styles.root} style={style} title={node.id} {...props}>
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
          <div>1999j.</div>
        </div>
      </div>
      <div className={styles.plus}>
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
