import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import { useState } from 'react';
import style from './CardsContainer.module.css';

const CardContainer = () => {
  const pokemonName = useSelector(state => state.pokemonName);
  const pokemonNotFound = useSelector(state => state.pokemonNotFound);
  const filterOrigin = useSelector(state => state.filterOrigin);

  const [filteredPokemon, setFilteredPokemon] = useState({});

  useEffect(() => {
    setFilteredPokemon(pokemonName);
  }, [pokemonName]);

  return (
    <div className={style.divBody}>
      {Object.keys(filteredPokemon).length === 0 ? (
        <>
          {pokemonNotFound ? (
            <>
              <h1>Pokemon no encontrado</h1>
            </>
          ) : (
            <>
              {filterOrigin.slice(0, 12).map(pokemon => (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  image={pokemon.image}
                  name={pokemon.name}
                  type={pokemon.type}
                />
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <Card
            key={filteredPokemon.id}
            id={filteredPokemon.id}
            image={filteredPokemon.image}
            name={filteredPokemon.name}
          />
        </>
      )}
    </div>
  );
};

export default CardContainer;
