import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [pokemonName, setPokemonName] = useState('');
  const handleSearch = () => {
    dispatch(getPokemonByName(pokemonName));
  };

  return (
    <div className={styles.bodySearch}>
      <input
        className={styles.input}
        type="search"
        onChange={event => setPokemonName(event.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search Pokemon
      </button>
    </div>
  );
};

export default SearchBar;
