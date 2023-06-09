import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  FILTER_TYPE,
  FILTER_ORIGIN,
  CLEAN_DETAIL,
  ORDER_POKEMONS,
  GET_POKEMON_ERROR,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from './actions';

const initialState = {
  pokemons: [],
  types: [],
  pokemonId: {},
  pokemonName: {},
  error: null,
  filterType: [],
  filterOrigin: [],
  sortPokemons: null,
  message: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filterOrigin: action.payload,
      };

    case SET_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    case GET_TYPES:
      return { ...state, types: action.payload };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemonId: action.payload };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonName: action.payload,
        error: null,
      };
    case GET_POKEMON_ERROR:
      return {
        ...state,
        pokemonName: {},
        error: action.payload,
      };

    case FILTER_TYPE:
      return {
        ...state,
        filterType:
          action.payload === undefined || action.payload === 'all'
            ? []
            : [action.payload],
      };

    case ORDER_POKEMONS:
      return { ...state, sortPokemons: action.payload };

    case FILTER_ORIGIN:
      let myFilter = state.pokemons.slice();
      if (action.payload === 'api') {
        myFilter = state.pokemons.filter(pokemon => {
          if (!!state.filterType.length) {
            return (
              typeof pokemon.id === 'number' &&
              pokemon.type.includes(state.filterType[0])
            );
          } else {
            return typeof pokemon.id === 'number';
          }
        });
      } else if (action.payload === 'database') {
        myFilter = state.pokemons.filter(pokemon => {
          if (!!state.filterType.length) {
            return (
              typeof pokemon.id === 'string' &&
              pokemon.type.includes(state.filterType[0])
            );
          } else {
            return typeof pokemon.id === 'string';
          }
        });
      } else {
        myFilter = !!state.filterType.length
          ? state.pokemons.filter(pokemon =>
              pokemon.type.includes(state.filterType[0])
            )
          : state.pokemons;
      }

      if (myFilter.length === 0) {
        return {
          ...state,
          filterOrigin: [],
          message: 'No Pokemon found with that filter.',
        };
      }

      if (state.sortPokemons === 'name-asc') {
        myFilter.sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.sortPokemons === 'name-desc') {
        myFilter.sort((a, b) => b.name.localeCompare(a.name));
      } else if (state.sortPokemons === 'attack-asc') {
        myFilter.sort((a, b) => a.stroke - b.stroke);
      } else if (state.sortPokemons === 'attack-desc') {
        myFilter.sort((a, b) => b.stroke - a.stroke);
      } else if (state.sortPokemons === 'none') {
        myFilter.sort(() => Math.random() - 0.5);
      }

      return { ...state, filterOrigin: [...myFilter], message: null };

    case CLEAN_DETAIL:
      return {
        ...state,
        pokemonId: {},
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
