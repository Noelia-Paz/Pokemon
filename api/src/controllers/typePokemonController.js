const axios = require('axios');
const { API_POKE_URL_TYPE } = process.env;
const { TypePokemon } = require('../db');

const getAllTypePokemons = async () => {
  const typeDatabase = await TypePokemon.findAll();

  if (typeDatabase.length === 0) {
    const apiPokemons = (await axios.get(`${API_POKE_URL_TYPE}`)).data;

    typeAPi = apiPokemons.results;

    for (const type of typeAPi) {
      await TypePokemon.create({
        name: type.name,
      });
    }
  }

  return typeDatabase;
};

module.exports = { getAllTypePokemons };
