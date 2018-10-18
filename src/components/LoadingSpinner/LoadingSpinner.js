import React from 'react';
import Spinner from 'components/common/Spinner/Spinner';
import styles from './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}>
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingSpinner;

