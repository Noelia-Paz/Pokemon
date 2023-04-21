import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import style from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  return (
    <div className={style.divBody}>
      <div className={style.SearchBar}>
        <SearchBar />
      </div>
      <div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
