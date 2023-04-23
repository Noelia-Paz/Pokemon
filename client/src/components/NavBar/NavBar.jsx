import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <h1 className={style.title}>PokemonApi</h1>
      <div>
        <Link to="/home" className={style.link}>
          HOME
        </Link>
        <Link to="/form" className={style.link}>
          CREATE A POKEMON
        </Link>
      </div>
      <div className={style.linkExit}>
        <Link to="/" className={style.salir}>
          EXIT
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
