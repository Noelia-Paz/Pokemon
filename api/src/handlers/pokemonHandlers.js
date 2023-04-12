const {
  getAllPokemons,
  getPokemonId,
  getPokemonName,
  createPokemon,
} = require('../constrollers/pokemonController');

const getPokemonHandler = (req, res) => {
  try {
    send('estoy en pokemos');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonIdHandler = (req, res) => {
  const id = req.params.id;
  res.status(200).send(`Estos son los detalles del pokemon con ID ${id}`);
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonNameHandler = (req, res) => {
  const { name } = req.query;
  console.log(name);

  res.status(200).send(`Estos son los pokemons con nombre ${name}`);
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = (req, res) => {
  res.status(200).send('estoy posteando un pokemon');
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonIdHandler,
  getPokemonNameHandler,
  createPokemonHandler,
};
