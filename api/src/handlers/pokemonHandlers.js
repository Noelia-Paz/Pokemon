const {
  getAllPokemons,
  getPokemonId,
  getPokemonName,
  createPokemon,
} = require('../controllers/pokemonController');

const getPokemonHandler = async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonIdHandler = async (req, res) => {
  const { idPokemon } = req.params;
  const source = isNaN(idPokemon) ? 'bdd' : 'api';
  try {
    const pokemon = await getPokemonId(idPokemon, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonNameHandler = async (req, res) => {
  const name = req.query.name.toLowerCase();

  try {
    const pokemonName = await getPokemonName(name);
    res.status(200).json(pokemonName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  const { name, life, stroke, defending, speed, height, weight, image, type } =
    req.body;
  try {
    const newPokemon = await createPokemon(
      name,
      life,
      stroke,
      defending,
      speed,
      height,
      weight,
      image,
      type
    );
    res.status(200).json(newPokemon);
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
