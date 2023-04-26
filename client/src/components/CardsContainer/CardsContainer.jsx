import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';

const CardContainer = () => {
  const pokemonName = useSelector(state => state.pokemonName);
  const filterOrigin = useSelector(state => state.filterOrigin);
  const [filteredPokemonName, setFilteredPokemonName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setFilteredPokemonName(pokemonName);
  }, [pokemonName]);

  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    setNumPages(Math.ceil(filterOrigin.length / ITEMS_PER_PAGE));
    setIsLoading(false);
  }, [filterOrigin]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handleLastPageClick = () => {
    setCurrentPage(numPages);
  };

  const handleCleanPokemon = () => {
    setFilteredPokemonName({});
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredPokemon = filterOrigin.slice(startIndex, endIndex);

  const pageButtons = [];
  for (let i = 1; i <= numPages; i++) {
    pageButtons.push(
      <button
        className={style.buttonPag}
        key={i}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={style.divBody}>
      {Object.keys(filteredPokemonName).length ? (
        <div className={style.cardName}>
          <Card
            key={filteredPokemonName.id}
            name={filteredPokemonName.name}
            image={filteredPokemonName.image}
            type={filteredPokemonName.type}
            stroke={filteredPokemonName.stroke}
          />
          <div className={style.divButtonCarName}>
            <button
              className={style.buttonCardName}
              onClick={handleCleanPokemon}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {filteredPokemon.length ? (
                <>
                  <div className={style.divCars}>
                    {filteredPokemon.map(pokemon => (
                      <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        image={pokemon.image}
                        name={pokemon.name}
                        stroke={pokemon.stroke}
                        type={pokemon.type}
                      />
                    ))}
                  </div>
                  <div className={style.divButton}>
                    <button
                      className={style.buttonPag}
                      onClick={handleFirstPageClick}
                    >
                      First page
                    </button>
                    {pageButtons}
                    <button
                      className={style.buttonPag}
                      onClick={handleLastPageClick}
                    >
                      Last page
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1>Pokemon no encontrado</h1>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardContainer;
