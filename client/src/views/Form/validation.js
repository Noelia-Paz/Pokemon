const validation = (state, errorsState) => {
  const errors = { ...errorsState };

  if (!state.name) errors.name = 'El campo no puede estar vacio';
  else if (state.name.length > 20)
    errors.name = 'No puede tener mas de 20 caracteres';
  else if (!/^[a-zA-Z0-9]*$/.test(state.name))
    errors.name = 'El nombre debe contener solo numeros y/o letras';
  else errors.name = '';

  if (!state.image) {
    errors.image = 'El campo no puede estar vacío';
  } else {
    const regex = /\.(jpg|png|svg)$/;
    if (!regex.test(state.image)) {
      errors.image =
        'Debe ingresar una imagen con terminaciones en ".jpg", ".png" o ".svg"';
    } else {
      errors.image = '';
    }
  }

  if (!state.life) errors.life = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.life))
    errors.life = 'El campo debe ser un número';
  else errors.life = '';

  if (!state.stroke) errors.stroke = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.stroke))
    errors.stroke = 'El campo debe ser un número';
  else errors.stroke = '';

  if (!state.defending) errors.defending = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.defending))
    errors.defending = 'El campo debe ser un número';
  else errors.defending = '';

  if (!state.speed) errors.speed = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.speed))
    errors.speed = 'El campo debe ser un número';
  else errors.speed = '';

  if (!state.height) errors.height = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.height))
    errors.height = 'El campo debe ser un número';
  else errors.height = '';

  if (!state.weight) errors.weight = 'El campo no puede estar vacío';
  else if (!/^\d+$/.test(state.weight))
    errors.weight = 'El campo debe ser un número';
  else errors.weight = '';

  if (!state.type) errors.type = 'El campo no puede estar vacío';
  else errors.type = '';

  return errors;
};

export default validation;
