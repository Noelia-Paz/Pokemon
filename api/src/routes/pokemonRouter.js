const { Router } = require('express');

const {
  getPokemonHandler,
  getPokemonIdHandler,
  getPokemonNameHandler,
  createPokemonHandler,
  deletePokemon,
} = require('../handlers/pokemonHandlers');
const { validatePokemonName } = require('../util/validations/validationStatus');

const pokemonRouter = Router();

pokemonRouter.get('/name', validatePokemonName, getPokemonNameHandler);

pokemonRouter.get('/:idPokemon', getPokemonIdHandler);

pokemonRouter.get('/', getPokemonHandler);

pokemonRouter.post('/', createPokemonHandler);
pokemonRouter.delete('/:id', deletePokemon);

module.exports = pokemonRouter;
