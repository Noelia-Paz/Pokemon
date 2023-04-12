const { getAllTypePokemons } = require('../constrollers/typePokemonController');

const getTypePokemonHandler = (req, res) => {
  try {
    send('estoy en pokemos tipos');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypePokemonHandler };
