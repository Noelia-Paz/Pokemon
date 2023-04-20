import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className={style.divBody}>
      <h1 className={style.h1}>Pokemon App</h1>
      <Link to={'/home'}>
        <button className={style.button}>Go Home</button>
      </Link>
    </div>
  );
};

export default Landing;
