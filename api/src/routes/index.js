const { Router } = require('express');

const pokemonRouter = require('./pokemonRouter');
const typePokemonRouter = require('./typePokemonRouter');

const router = Router();

router.use('/pokemon', pokemonRouter);
router.use('/type', typePokemonRouter);

module.exports = router;
