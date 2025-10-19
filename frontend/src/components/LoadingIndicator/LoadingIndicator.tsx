import styles from './LoadingIndicator.module.css';

interface LoadingIndicatorProps {
  message?: string;
  size?: number; // taille du spinner en px
}

const LoadingIndicator = ({ message = "Chargement...", size = 40 }: LoadingIndicatorProps) => {
  return (
    <div className={styles.container}>
      <div 
        className={styles.spinner} 
        style={{ width: size, height: size }}
      />
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingIndicator;
