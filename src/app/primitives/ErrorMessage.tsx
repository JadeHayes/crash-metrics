import React from 'react';
import styles from '../styles/page.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.page}>
      <div className={styles.errorMessage}>
        Error: {message}
      </div>
    </div>
  );
};

export default ErrorMessage; 