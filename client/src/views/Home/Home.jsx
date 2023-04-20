import CardContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons, getTypes } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);
  return (
    <div>
      <h1>Esta es la vista de home</h1>
      <SearchBar />
      <CardContainer />
    </div>
  );
};

export default Home;
