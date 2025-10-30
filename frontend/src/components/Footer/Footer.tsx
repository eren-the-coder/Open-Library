import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; Mangone Messi 2025. Tous droits réservés.</p>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) => 
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/about"
        >À propos</NavLink>
        <NavLink
          className={({ isActive }) => 
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/contact"
        >Me contacter</NavLink>
        {/* <NavLink
          className={({ isActive }) => 
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/privacy"
        >Confidentialité</NavLink> */}
      </div>
    </footer>
  );
};

export default Footer;