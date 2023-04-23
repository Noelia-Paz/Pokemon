import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const FILTER_TYPE = 'FILTER_TYPE';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const ORDER_POKEMONS = 'ORDER_POKEMONS';

export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get('http://localhost:3001/pokemon');
    const pokemons = apiData.data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const apiData = await axios.get('http://localhost:3001/type');
    const pokemonsTypes = apiData.data;
    dispatch({ type: GET_TYPES, payload: pokemonsTypes });
  };
};

export const getPokemonById = id => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const pokemonId = apiData.data;
    dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonId });
  };
};

export const getPokemonByName = name => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/pokemon/name?name=${name}`
      );

      const pokemonName = apiData.data;

      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: { pokemonName, pokemonNotFound: false },
      });
    } catch (error) {
      const pokemonName = {};
      if (!!name) {
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: { pokemonName, pokemonNotFound: true },
        });
      } else {
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: { pokemonName, pokemonNotFound: false },
        });
      }
    }
  };
};

export const filterType = type => {
  return {
    type: FILTER_TYPE,
    payload: type,
  };
};

export const filterOrigin = value => {
  return {
    type: FILTER_ORIGIN,
    payload: value,
  };
};

export const orderPokemons = valueOrder => {
  return {
    type: ORDER_POKEMONS,
    payload: valueOrder,
  };
};
