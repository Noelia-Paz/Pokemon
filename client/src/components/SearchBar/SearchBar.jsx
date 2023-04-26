import styles from './SearchBar.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [inputValueName, setInputValueName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (inputValueName === '') {
      alert('Please write a name!');
    }
    setIsLoading(true);
    dispatch(getPokemonByName(inputValueName)).finally(() =>
      setIsLoading(false)
    );
  };

  return (
    <div className={styles.bodySearch}>
      <input
        placeholder="Write a Name"
        className={styles.input}
        type="search"
        value={inputValueName}
        onChange={event => setInputValueName(event.target.value)}
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
