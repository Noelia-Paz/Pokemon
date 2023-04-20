import styles from './SearchBar.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = event => {
    dispatch(getPokemonByName(event.target.value));
  };

  return (
    <div className={styles.bodySearch}>
      <input className={styles.input} type="search" onChange={handleSearch} />
      <button className={styles.button} onClick={handleSearch}>
        Search Pokemon
      </button>
    </div>
  );
};

export default SearchBar;
