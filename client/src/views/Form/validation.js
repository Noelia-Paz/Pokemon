const validation = (state, errorsState) => {
  const errors = { ...errorsState };

  if (!state.name) errors.name = 'The field cannot be empty';
  else if (state.name.length > 20)
    errors.name = 'The field cannot have more than 20 characters.';
  else if (!/^[a-zA-Z0-9]*$/.test(state.name))
    errors.name = 'The name must contain only numbers and/or letters';
  else errors.name = '';

  if (!state.image) {
    errors.image = 'The field cannot be empty';
  } else {
    const regex = /\.(jpg|png|svg)$/;
    if (!regex.test(state.image)) {
      errors.image =
        'You must enter an image ending in ".jpg", ".png" or ".svg"';
    } else {
      errors.image = '';
    }
  }

  if (!state.life) errors.life = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.life))
    errors.life = 'The field must be a number';
  else errors.life = '';

  if (!state.stroke) errors.stroke = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.stroke))
    errors.stroke = 'The field must be a number';
  else errors.stroke = '';

  if (!state.defending) errors.defending = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.defending))
    errors.defending = 'The field must be a number';
  else errors.defending = '';

  if (!state.speed) errors.speed = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.speed))
    errors.speed = 'The field must be a number';
  else errors.speed = '';

  if (!state.height) errors.height = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.height))
    errors.height = 'The field must be a number';
  else errors.height = '';

  if (!state.weight) errors.weight = 'The field cannot be empty';
  else if (!/^\d+$/.test(state.weight))
    errors.weight = 'The field must be a number';
  else errors.weight = '';

  if (!state.type) errors.type = 'The field cannot be empty';
  else errors.type = '';

  return errors;
};

export default validation;
