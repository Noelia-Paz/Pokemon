const { getAllTypePokemons } = require('../controllers/typePokemonController');

const getTypePokemonHandler = async (req, res) => {
  const { name, pokemonId } = req.body;
  try {
    const pokemons = await getAllTypePokemons(name, pokemonId);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypePokemonHandler };
