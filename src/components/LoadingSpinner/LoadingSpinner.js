import React from 'react';
import Spinner from 'components/common/Spinner/Spinner';

const LoadingSpinner = () => {
  const styles = require('./LoadingSpinner.scss');
  return (
    <div className={styles.root}>
      <div className={styles.spinner}>
        <Spinner color="black" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
