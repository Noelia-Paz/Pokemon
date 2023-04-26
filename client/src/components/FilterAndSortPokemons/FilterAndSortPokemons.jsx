import React, { useEffect, useState } from 'react';
import style from './FilterAndSortPokemons.module.css';
import { filterType, filterOrigin, orderPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const FilterAndSortPokemons = () => {
  const dispatch = useDispatch();
  const [originName, setOriginName] = useState('');
  const filterTypes = useSelector(state => state.filterType);
  const sortPokemons = useSelector(state => state.sortPokemons);

  useEffect(() => {
    dispatch(filterType());
    dispatch(filterOrigin());
    dispatch(orderPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterOrigin(originName));
  }, [filterTypes, sortPokemons]);

  const onChangeFilterType = event => {
    dispatch(filterType(event.target.value));
  };

  const onChangeFilterOrigin = event => {
    setOriginName(event.target.value);
    dispatch(filterOrigin(event.target.value));
  };

  const onChangeOrder = event => {
    dispatch(orderPokemons(event.target.value));
  };

  return (
    <div className={style.body}>
      <div className={style.div}>
        <label htmlFor="filter">Filter by Type </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeFilterType}
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flyings">Flyings</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
      </div>
      <div className={style.div}>
        <label htmlFor="filter">Filter by Origin </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeFilterOrigin}
        >
          <option value="both">External Api and Database</option>
          <option value="api">External Api</option>
          <option value="database">Database</option>
        </select>
      </div>

      <div className={style.div}>
        <label htmlFor="sort">Sort </label>
        <select name="name" className={style.select} onChange={onChangeOrder}>
          <option value="none">None </option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="attack-asc">Attack (minor to major) </option>
          <option value="attack-desc">Attack (major to minor) </option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSortPokemons;
