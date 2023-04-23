import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';

const ITEMS_PER_PAGE = 12;

const CardContainer = () => {
  const pokemonName = useSelector(state => state.pokemonName);
  const pokemonNotFound = useSelector(state => state.pokemonNotFound);
  const filterOrigin = useSelector(state => state.filterOrigin);

  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(Math.ceil(filterOrigin.length / ITEMS_PER_PAGE));
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

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredPokemon = filterOrigin.slice(startIndex, endIndex);

  const pageButtons = [];
  for (let i = 1; i <= numPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => handlePageChange(i)}>
        {i}
      </button>
    );
  }

  return (
    <div className={style.divBody}>
      {pokemonNotFound ? (
        <h1>Pokemon no encontrado</h1>
      ) : (
        <>
          {filteredPokemon.map(pokemon => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              type={pokemon.type}
            />
          ))}
          <div>
            <button onClick={handleFirstPageClick}>Primera página</button>
            {pageButtons}
            <button onClick={handleLastPageClick}>Última página</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardContainer;
