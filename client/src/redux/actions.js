import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';

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
    const apiData = await axios.get(
      `http://localhost:3001/pokemon/name?name=${name}`
    );
    const pokemonName = apiData.data;
    dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonName });
  };
};
