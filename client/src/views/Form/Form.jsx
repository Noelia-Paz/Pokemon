import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import validation from './validation';
import styles from './Form.module.css';
import { useDispatch } from 'react-redux';
import { getTypes } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Form = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector(state => state.types);
  const [form, setForm] = useState({
    name: '',
    image: '',
    life: '',
    stroke: '',
    defending: '',
    speed: '',
    height: '',
    weight: '',
    type: [],
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    life: '',
    stroke: '',
    defending: '',
    speed: '',
    height: '',
    weight: '',
    type: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  const changeHandler = event => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors(validation({ ...form, [property]: value }, errors));
  };

  const handleChangeTypes = event => {
    const typeName = event.target.value;
    const type = pokemonTypes.find(type => type.name === typeName);
    if (type) {
      const typeId = type.id;
      if (form.type.includes(typeId)) {
        let copia = form.type;
        let indexToRemove = copia.indexOf(typeId);
        copia.splice(indexToRemove, 1);
        setForm({ ...form, type: [...copia] });
      } else {
        setForm({ ...form, type: [...form.type, typeId] });
      }
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/pokemon', form)
      .then(res => alert(res))
      .catch(err => alert(err));
    alert('Se ha creado con exito!');
  };

  return (
    <div className={styles.divBody}>
      <h1 className={styles.h1}>Create a new Pokemon!</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.name}</p>
          </div>
          <div>
            <label htmlFor="image" className={styles.label}>
              Image:
            </label>
            <input
              type="text"
              value={form.image}
              onChange={changeHandler}
              name="image"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.image}</p>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="life" className={styles.label}>
              Life:
            </label>
            <input
              type="number"
              value={form.life}
              onChange={changeHandler}
              name="life"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.life}</p>
          </div>
          <div>
            <label htmlFor="stroke" className={styles.label}>
              Stroke:
            </label>
            <input
              type="number"
              value={form.stroke}
              onChange={changeHandler}
              name="stroke"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.stroke}</p>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="defending" className={styles.label}>
              Defending:
            </label>
            <input
              type="number"
              value={form.defending}
              onChange={changeHandler}
              name="defending"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.defending}</p>
          </div>
          <div>
            <label htmlFor="speed" className={styles.label}>
              Speed:
            </label>
            <input
              type="number"
              value={form.speed}
              onChange={changeHandler}
              name="speed"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.speed}</p>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="height" className={styles.label}>
              Height:
            </label>
            <input
              type="number"
              step="0.01"
              value={form.height}
              onChange={changeHandler}
              name="height"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.height}</p>
          </div>
          <div>
            <label htmlFor="height" className={styles.label}>
              Weight:
            </label>
            <input
              type="number"
              step="0.01"
              value={form.weight}
              onChange={changeHandler}
              name="weight"
              className={styles.input}
            />
            <p className={styles.danger}>{errors.height}</p>
          </div>
        </div>

        <label htmlFor="type" className={styles.label}>
          Type:
        </label>
        <div className={styles.divContentType}>
          {pokemonTypes.map(option => (
            <div key={option.id} className={styles.divType}>
              <input
                type="checkbox"
                id={option.name}
                name="type"
                value={option.name}
                onChange={handleChangeTypes}
                checked={form.type.includes(option.id)}
              />
              <label htmlFor={option.name}>{option.name}</label>
            </div>
          ))}
          <p className={styles.danger}>{errors.type}</p>
        </div>
        <button className={styles.boton} type="submit">
          Create Pokemon
        </button>
        <Link to={'/home'}>
          <button className={styles.buttonBack}>Back</button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
