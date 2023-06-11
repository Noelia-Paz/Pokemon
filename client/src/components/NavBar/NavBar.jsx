import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { getPokemonByName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleCleanPokemon = () => {
    dispatch(getPokemonByName(""));
  };
  return (
    <div className={style.navBar}>
      <Link to="/home" className={style.link}>
        <h1 className={style.title}>PokemonApi</h1>
      </Link>

      <div className={style.titleNav}>
        <Link to="/home" className={style.link}>
          HOME
        </Link>
        <Link to="/form" className={style.link}>
          CREATE A POKEMON
        </Link>
      </div>
      <div className={style.linkExit}>
        <Link to="/" className={style.salir} onClick={handleCleanPokemon}>
          EXIT
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
