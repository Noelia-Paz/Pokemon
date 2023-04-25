import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [pokemonName, setPokemonName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    dispatch(getPokemonByName(pokemonName)).finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.bodySearch}>
      <input
        placeholder="Write a Name"
        className={styles.input}
        type="search"
        onChange={event => setPokemonName(event.target.value)}
      />
      {isLoading ? (
        <p className={styles.isLoading}>Searching...</p>
      ) : (
        <button className={styles.button} onClick={handleSearch}>
          Search Pokemon
        </button>
      )}
    </div>
  );
};

export default SearchBar;
