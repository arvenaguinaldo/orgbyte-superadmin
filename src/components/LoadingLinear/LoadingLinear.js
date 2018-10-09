import React from 'react';
import LinearDeterminate from 'components/common/LinearDeterminate/LinearDeterminate';
import styles from './LoadingLinear.scss';

const LoadingLinear = () => {
  return (
    <div className={styles.root}>
      <div className={styles.linear}>
        <LinearDeterminate />
      </div>
    </div>
  );
};

export default LoadingLinear;

