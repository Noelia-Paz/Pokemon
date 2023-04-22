import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = props => {
  return (
    <div className={style.bodyCard}>
      <img className={`${style.image} image-size`} src={props.image} alt="" />
      <Link to={`/pokemon/${props.id}`}>
        <h1 className={style.name}> Name: {props.name}</h1>
      </Link>
      <h2 className={style.info}>Types: {props.type?.join(', ')}</h2>
    </div>
  );
};

export default Card;
