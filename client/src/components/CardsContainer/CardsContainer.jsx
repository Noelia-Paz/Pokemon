import style from './CardsContainer.module.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

const CardContainer = () => {
  const pokemons = useSelector(state => state.pokemons);
  const pokemonName = useSelector(state => state.pokemonName);

  const filteredPokemons = pokemons
    .filter(pokemon => {
      if (!pokemonName || pokemonName.length === 0) {
        return true;
      } else {
        const name = pokemon.name;
        const search = pokemonName[0].name;
        return name.includes(search);
      }
    })
    .slice(0, 12);

  return (
    <div className={style.divBody}>
      <div className={style.divChar}>
        {filteredPokemons.map(pokemon => {
          return (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              type={pokemon.type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;
