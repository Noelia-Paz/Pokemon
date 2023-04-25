const validatePokemonName = (req, res, next) => {
  const pokemonName = req.query.name.toLowerCase();

  if (typeof pokemonName !== 'string' || !isNaN(pokemonName)) {
    return res
      .status(400)
      .json({ message: 'Pokemon name must be a text string' });
  }

  if (!pokemonName.length) {
    return res.status(400).json({ message: 'The name cannot be empty' });
  }

  next();
};

module.exports = {
  validatePokemonName,
};
