import React, { useEffect } from 'react';
import style from './FilterAndSortPokemons.module.css';
import {
  filterType,
  filterOrigin,
  orderName,
  orderStroke,
} from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';

const FilterAndSortPokemons = () => {
  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterType('Normal'));
    dispatch(filterOrigin('api'));
    dispatch(orderName('name-asc'));
    dispatch(orderStroke('attack-asc'));
  }, [dispatch]);

  const onChangeFilterType = event => {
    dispatch(filterType(event.target.value));
  };

  const onChangeFilterOrigin = event => {
    console.log(event.target.value);
    dispatch(filterOrigin(event.target.value));
  };

  const onChangeOrderName = event => {
    dispatch(orderName(event.target.value));
  };

  const onChangeOrderStroke = event => {
    dispatch(orderStroke(event.target.value));
  };

  return (
    <div className={style.body}>
      <div>
        <label htmlFor="filter">Filter by: </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeFilterType}
        >
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
      <div>
        <label htmlFor="filter">Filter by: </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeFilterOrigin}
        >
          <option value="api">External api</option>
          <option value="database">Database</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeOrderName}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          name="name"
          className={style.select}
          onChange={onChangeOrderStroke}
        >
          <option value="attack-asc">Attack (minor to major) </option>
          <option value="attack-desc">Attack (major to minor) </option>
        </select>
      </div>

      <div>
        {pokemons?.slice(0, 12).map(pokemon => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            type={pokemon.type}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterAndSortPokemons;
