export const ADD_USER = 'ADD_USER';

export const addUser = (gravatarEmail, name) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
    name,
  },
});
