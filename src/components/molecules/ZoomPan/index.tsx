import { useEffect, useRef, memo } from 'react';
import classNames from 'classnames';
import { create } from 'pinch-zoom-pan';

import { ZoomPanProps } from './props';
import styles from './index.module.scss';

export default memo<ZoomPanProps>(function ZoomPan({
  min,
  max,
  captureWheel,
  className,
  style,
  children,
  ...props
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    return create({ element, minZoom: min, maxZoom: max, captureWheel });
  }, [min, max, captureWheel]);

  return (
    <div
      ref={root}
      className={classNames(className, styles.root)}
      style={style}
      {...props}
    >
      <div className={styles.point}>
        <div className={styles.canvas}>{children}</div>
      </div>
    </div>
  );
});
