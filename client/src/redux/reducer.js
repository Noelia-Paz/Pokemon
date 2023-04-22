import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  FILTER_TYPE,
  FILTER_ORIGIN,
  ORDER_POKEMONS,
} from './actions';

const initialState = {
  pokemons: [],
  types: [],
  pokemonId: {},
  pokemonName: {},
  pokemonNotFound: false,
  filterType: [],
  filterOrigin: [],
  sortPokemons: null,
  isPokemonDatabase: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filterOrigin: action.payload,
      };

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

      if (state.sortPokemons === 'name-asc') {
        console.log('entra');
        myFilter.sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.sortPokemons === 'name-desc') {
        myFilter.sort((a, b) => b.name.localeCompare(a.name));
      } else if (state.sortPokemons === 'attack-asc') {
        myFilter.sort((a, b) => a.stroke - b.stroke);
      } else if (state.sortPokemons === 'attack-desc') {
        myFilter.sort((a, b) => b.stroke - a.stroke);
      }

      return { ...state, filterOrigin: [...myFilter] };

    default:
      return { ...state };
  }
};

export default rootReducer;
