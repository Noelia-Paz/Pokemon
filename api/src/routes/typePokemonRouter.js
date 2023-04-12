const { Router } = require('express');
const { getTypePokemonHandler } = require('../handlers/typePokemonHandlers');

const typePokemonRouter = Router();

typePokemonRouter.get('/', getTypePokemonHandler);

module.exports = typePokemonRouter;
