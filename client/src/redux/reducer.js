import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
  FILTER_TYPE,
  FILTER_ORIGIN,
  ORDER_NAME,
  ORDER_STROKE,
} from './actions';

const initialState = {
  pokemons: [],
  types: [],
  pokemonId: {},
  pokemonName: {},
  pokemonNotFound: false,
  filterType: [],
  filterOrigin: [],
  orderName: [],
  orderStroke: [],
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

    case FILTER_TYPE:
      let normalPokemons = state.pokemons.filter(pokemon =>
        pokemon.type.includes(action.payload)
      );

      return {
        ...state,
        filterType: [...normalPokemons],
      };

    case FILTER_ORIGIN:
      let myFilter = state.pokemons.slice();
      if (action.payload === 'api') {
        myFilter = state.pokemons.filter(
          pokemon => typeof pokemon.id === 'number'
        );
      } else {
        myFilter = state.pokemons.filter(
          pokemon => typeof pokemon.id === 'string'
        );
      }
      return { ...state, filterOrigin: [...myFilter] };

    case ORDER_NAME:
      let myOrder = state.pokemons.slice();
      if (action.payload === 'name-asc') {
        myOrder.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        myOrder.sort((a, b) => b.name.localeCompare(a.name));
      }
      return { ...state, orderName: [...myOrder] };

    case ORDER_STROKE:
      let myOrderStroke = state.pokemons.slice();
      if (action.payload === 'attack-asc') {
        myOrderStroke.sort((a, b) => a.stroke - b.stroke);
      } else {
        myOrderStroke.sort((a, b) => b.stroke - a.stroke);
      }
      return { ...state, orderStroke: [...myOrderStroke] };

    default:
      return { ...state };
  }
};

export default rootReducer;
