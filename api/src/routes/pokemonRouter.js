const { Router } = require('express');

const {
  getPokemonHandler,
  getPokemonIdHandler,
  getPokemonNameHandler,
  createPokemonHandler,
} = require('../handlers/pokemonHandlers');

const pokemonRouter = Router();

pokemonRouter.get('/name', getPokemonNameHandler);

pokemonRouter.get('/:idPokemon', getPokemonIdHandler);

pokemonRouter.get('/', getPokemonHandler);

pokemonRouter.post('/', createPokemonHandler);

module.exports = pokemonRouter;
