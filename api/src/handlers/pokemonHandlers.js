const {
  getAllPokemons,
  getPokemonId,
  getPokemonName,
  createPokemon,
  deletePokemonId,
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
    res.status(404).json({ message: 'The id does not exist' });
  }
};

const getPokemonNameHandler = async (req, res) => {
  const pokemonName = req.query.name.toLowerCase();

  try {
    const pokemon = await getPokemonName(pokemonName);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).json({ message: 'The Name does not exist' });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonEliminado = await deletePokemonId(id);
    res.status(200).json({ message: 'se a eliminado' });
  } catch (error) {
    res.status(404).json({ message: 'error al eliminar' });
  }
};

const createPokemonHandler = async (req, res) => {
  const { name, life, stroke, defending, speed, height, weight, image, type } =
    req.body;

  if (
    !name ||
    !life ||
    !stroke ||
    !defending ||
    !speed ||
    !height ||
    !weight ||
    !image ||
    !type
  ) {
    return res.status(400).send('All fields must be complete');
  }
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
  deletePokemon,
};
