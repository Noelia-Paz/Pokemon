import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';

const Detail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemonId);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.divDetail}>
      <Link to={'/home'}>
        <button className={styles.button}>BACK</button>
      </Link>
      {pokemon.name ? (
        <div className={styles.divDetailCar}>
          <h2 className={styles.h2}>Name: {pokemon.name.toUpperCase()}</h2>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
          <h2 className={styles.h2}>Type: {pokemon.type.join(', ')}</h2>
          <h2 className={styles.h2}>life: {pokemon.life}</h2>
          <h2 className={styles.h2}>Stroke: {pokemon.stroke}</h2>
          <h2 className={styles.h2}>Defending: {pokemon.defending}</h2>
          <h2 className={styles.h2}>Speed: {pokemon.speed}</h2>
          <h2 className={styles.h2}>Height: {pokemon.height}</h2>
          <h2 className={styles.h2}>Weight: {pokemon.weight}</h2>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Detail;
