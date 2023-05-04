import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import {
  getPokemonByName,
  setMessage,
  getPokemons,
  clearMessage,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';

const CardsContainer = () => {
  const dispatch = useDispatch();
  const pokemonName = useSelector(state => state.pokemonName);
  const filterOrigin = useSelector(state => state.filterOrigin);
  const message = useSelector(state => state.message);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(12);

  useEffect(() => {
    dispatch(setMessage(null));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    dispatch(clearMessage());
  }, [dispatch]);

  const handleCleanPokemon = () => {
    dispatch(getPokemonByName(''));
  };

  const handleCleanFiltro = () => {
    dispatch(getPokemons());
    dispatch(clearMessage());
  };

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = filterOrigin.slice(
    indexOfFirstElement,
    indexOfLastElement
  );

  const allPokemon = currentElements.length ? (
    <div className={style.divCars}>
      {currentElements.map(pokemon => (
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
  ) : (
    <p className={style.pText}>{message}</p>
  );

  const filteredByName = Object.keys(pokemonName).length ? (
    <div className={style.cardName}>
      <Card
        key={pokemonName.id}
        id={pokemonName.id}
        name={pokemonName.name}
        image={pokemonName.image}
        type={pokemonName.type}
        stroke={pokemonName.stroke}
      />
      <div className={style.divButtonCarName}>
        <button className={style.buttonCardName} onClick={handleCleanPokemon}>
          Back
        </button>
      </div>
    </div>
  ) : null;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterOrigin.length / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.divBodyCards}>
      {isLoading ? (
        <p className={style.pText}>Searching...</p>
      ) : (
        <>
          {filteredByName ? (
            filteredByName
          ) : (
            <>
              {allPokemon}

              {currentElements.length ? (
                <div className={style.divButton}>
                  <button
                    className={style.buttonPag}
                    onClick={() => setCurrentPage(1)}
                  >
                    First
                  </button>
                  {pageNumbers.map(number => (
                    <button
                      className={style.buttonPag}
                      key={number}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    className={style.buttonPag}
                    onClick={() =>
                      setCurrentPage(
                        Math.ceil(filterOrigin.length / elementsPerPage)
                      )
                    }
                  >
                    Last
                  </button>
                </div>
              ) : (
                <div className={style.divButtonCarName}>
                  <button
                    className={style.buttonCardName}
                    onClick={handleCleanFiltro}
                  >
                    Back
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardsContainer;
