import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <Link to="/home" className={style.link}>
        HOME
      </Link>
      <Link to="/form" className={style.link}>
        FORM
      </Link>
      <Link to="/" className={style.salir}>
        GO OUT
      </Link>
    </div>
  );
};

export default NavBar;
