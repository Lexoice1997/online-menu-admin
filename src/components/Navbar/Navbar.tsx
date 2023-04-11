import EqualizerIcon from '@mui/icons-material/Equalizer';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>LOGO</h1>
      </div>

      <Link to="/">
        <div className={pathname === '/' ? styles.linksActive : styles.links}>
          <div className={styles.linksItems}>
            <RestaurantMenuIcon />
            <p className="text-sm font-semibold">Menu</p>
          </div>
        </div>
      </Link>

      <Link to="/bot">
        <div className={pathname === '/bot' ? styles.linksActive : styles.links}>
          <div className={styles.linksItems}>
            <SmartToyIcon />
            <p>Bot</p>
          </div>
        </div>
      </Link>

      <Link to="/statistic">
        <div className={pathname === '/statistics' ? styles.linksActive : styles.links}>
          <div className={styles.linksItems}>
            <EqualizerIcon />
            <p>Statistic</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
