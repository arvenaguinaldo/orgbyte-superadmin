import React from 'react';
import Spinner from 'components/common/Spinner/Spinner';
import LayoutWithTopbarAndSidebar from 'layouts/LayoutWithTopbarAndSidebar';
import styles from './LoadingSpinnerInsideLayout.scss';


const LoadingSpinnerInsideLayout = () => {
  return (
    <LayoutWithTopbarAndSidebar>
      <div className={styles.root}>
        <div className={styles.spinner}>
          <Spinner />
        </div>
      </div>
    </LayoutWithTopbarAndSidebar>
  );
};

export default LoadingSpinnerInsideLayout;

