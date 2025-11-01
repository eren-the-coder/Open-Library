import type React from 'react';
import styles from './LoadingIndicator.module.css';

interface LoadingIndicatorProps {
  message?: string;
  size?: number;
  containerStyle?: React.CSSProperties;
}

const LoadingIndicator = ({ message = "Chargement...", size = 40, containerStyle }: LoadingIndicatorProps) => {
  return (
    <div
      className={styles.container}
      style={containerStyle && {
        ...containerStyle
      }}
    >
      <div 
        className={styles.spinner} 
        style={{ width: size, height: size }}
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingIndicator;
