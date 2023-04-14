const axios = require('axios');

const { TypePokemon } = require('../db');

const getAllTypePokemons = async () => {
  const typeDatabase = await TypePokemon.findAll();

  if (typeDatabase.length === 0) {
    const apiPokemons = (await axios.get(`https://pokeapi.co/api/v2/type`))
      .data;

    typeAPi = apiPokemons.results;

    for (const type of typeAPi) {
      await TypePokemon.create({
        name: type.name,
      });
    }
  }

  return typeDatabase;
};

const createType = async (name, pokemonId) => {
  const type = await TypePokemon.create({ name });
  await type.setPokemon(pokemonId);
};

module.exports = { getAllTypePokemons, createType };
