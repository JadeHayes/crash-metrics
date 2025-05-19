import React, { ReactNode } from 'react';
import styles from '../../styles/page.module.css'; // Adjusted path for styles

interface LoadingSpinnerProps {
  children?: ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.spinner} />
      {children ? children : <p>Loading...</p>}
    </div>
  );
};

export default LoadingSpinner; 