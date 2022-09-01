import React from 'react';
import classNames from 'classnames';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { FamilyNodeProps } from './FamilyNode.props';
import styles from './FamilyNode.module.scss';

export default React.memo<FamilyNodeProps>(function FamilyNode({
  className,
  node,
  isRoot,
  onSubClick,
  style,
  ...props
}) {
  console.log(node.name);

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
        <div className={styles.info} >
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
