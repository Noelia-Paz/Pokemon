import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = props => {
  const elementsH1 = props.type.map((type, index) => {
    return (
      <h1 key={index} className={style.h1Type}>
        {type.toLocaleUpperCase()}
      </h1>
    );
  });

  return (
    <div className={style.bodyCard}>
      <img className={`${style.image} image-size`} src={props.image} alt="" />
      <Link className={style.linkName} to={`/pokemon/${props.id}`}>
        <h1 className={style.name}> {props.name.toLocaleUpperCase()}</h1>
      </Link>
      <div className={style.divType}>{elementsH1}</div>
    </div>
  );
};

export default Card;
