const axios = require('axios');
const { API_POKE_URL } = process.env;

const { Pokemon, TypePokemon } = require('../db');

const createPokemonPropertiesDatabase = pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    life: pokemon.life,
    stroke: pokemon.stroke,
    defending: pokemon.defending,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
    type: pokemon.typePokemons.map(type => type.name),
  };
};

const createPokemonPropertiesApiPoke = pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default,
    life: pokemon.stats[0].base_stat,
    stroke: pokemon.stats[1].base_stat,
    defending: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    type: pokemon.types.map(type => type.type.name),
  };
};

const getAllPokemons = async () => {
  const databasePokemons = await Pokemon.findAll({
    include: [
      {
        model: TypePokemon,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const pokemonDataDb = databasePokemons.reverse().map(pokemon => {
    return createPokemonPropertiesDatabase(pokemon);
  });
  const apiPokemons = await axios.get(`${API_POKE_URL}?offset=20&limit=60"`);
  const results = apiPokemons.data.results;
  const promises = results.map(result => axios.get(result.url));
  const pokemonResponses = await Promise.all(promises);
  const pokemons = pokemonResponses.map(response => response.data);
  const pokemonsDataApi = pokemons.map(pokemon => {
    return createPokemonPropertiesApiPoke(pokemon);
  });

  return [...pokemonDataDb, ...pokemonsDataApi];
};

const getPokemonId = async (idPokemon, source) => {
  let pokemon;

  if (source === 'api') {
    const response = await axios.get(`${API_POKE_URL}/${idPokemon}`);
    pokemon = response.data;
    const pokemonApi = createPokemonPropertiesApiPoke(pokemon);
    return pokemonApi;
  } else if (source === 'bdd') {
    pokemon = await Pokemon.findByPk(idPokemon, {
      include: {
        model: TypePokemon,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    const pokemonDatabase = createPokemonPropertiesDatabase(pokemon);
    return pokemonDatabase;
  }
};

const getPokemonName = async pokemonName => {
  const databasePokemonName = await Pokemon.findOne({
    where: { name: pokemonName },
    include: {
      model: TypePokemon,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  if (databasePokemonName === null) {
    const pokemon = (await axios.get(`${API_POKE_URL}/${pokemonName}`)).data;
    const pokemonApi = createPokemonPropertiesApiPoke(pokemon);
    return pokemonApi;
  } else {
    const {
      id,
      name,
      image,
      life,
      stroke,
      defending,
      speed,
      height,
      weight,
      typePokemons,
    } = databasePokemonName;

    const pokemonDatabase = {
      id,
      name,
      image,
      life,
      stroke,
      defending,
      speed,
      height,
      weight,
      type: typePokemons.map(type => type.name),
    };
    return pokemonDatabase;
  }
};

const createPokemon = async (
  name,
  life,
  stroke,
  defending,
  speed,
  height,
  weight,
  image,
  type
) => {
  const newPokemon = await Pokemon.create({
    name,
    life,
    stroke,
    defending,
    speed,
    height,
    weight,
    image,
  });

  await newPokemon.addTypePokemon(type);
  return newPokemon;
};

module.exports = {
  getAllPokemons,
  getPokemonId,
  getPokemonName,
  createPokemon,
};
