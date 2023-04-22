import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterAndSortPokemons from '../../components/FilterAndSortPokemons/FilterAndSortPokemons';
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
        <FilterAndSortPokemons />
      </div>
      <div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;
