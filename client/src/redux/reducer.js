import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
} from './actions';

const initialState = {
  pokemons: [],
  types: [],
  pokemonId: {},
  pokemonName: {},
  pokemonNotFound: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };
    case GET_TYPES:
      return { ...state, types: action.payload };
    case GET_POKEMON_BY_ID:
      return { ...state, pokemonId: action.payload };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonName: action.payload.pokemonName,
        pokemonNotFound: action.payload.pokemonNotFound,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
