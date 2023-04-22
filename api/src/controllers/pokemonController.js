const axios = require('axios');

const { Pokemon, TypePokemon } = require('../db');

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

  const pokemonDataDb = databasePokemons.map(pokemon => {
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
  });

  const apiPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const results = apiPokemons.data.results;
  const promises = results.map(result => axios.get(result.url));
  const pokemonResponses = await Promise.all(promises);
  const pokemons = pokemonResponses.map(response => response.data);

  const pokemonsDataApi = pokemons.map(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      life: pokemon.stats[0].base_stat,
      stroke: pokemon.stats[1].base_stat,
      defending: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      type: pokemon.types.map(type => type.type.name),
    };
  });

  return [...pokemonDataDb, ...pokemonsDataApi];
};

const getPokemonId = async (idPokemon, source) => {
  let pokemon;

  if (source === 'api') {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );
    pokemon = response.data;
    const pokemonApi = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      life: pokemon.stats[0].base_stat,
      stroke: pokemon.stats[1].base_stat,
      defending: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      type: pokemon.types.map(type => type.type.name),
    };
    return pokemonApi;
  } else {
    pokemon = await Pokemon.findByPk(idPokemon, {
      include: {
        model: TypePokemon,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    if (!pokemon) throw Error('El id no existe');
    const pokemonDatabase = {
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
    return pokemonDatabase;
  }
};

const getPokemonName = async name => {
  const databasePokemonName = await Pokemon.findAll({ where: { name } });

  if (databasePokemonName.length === 0) {
    const apiPokemonsName = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    ).data;

    const pokemonApi = {
      id: apiPokemonsName.id,
      name: apiPokemonsName.name,
      image: apiPokemonsName.sprites.other.dream_world.front_default,
      life: apiPokemonsName.stats[0].base_stat,
      stroke: apiPokemonsName.stats[1].base_stat,
      defending: apiPokemonsName.stats[2].base_stat,
      speed: apiPokemonsName.stats[5].base_stat,
      height: apiPokemonsName.height,
      weight: apiPokemonsName.weight,
    };

    return [pokemonApi];
  }
  return databasePokemonName;
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
