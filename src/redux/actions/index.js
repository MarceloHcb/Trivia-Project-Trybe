export const ADD_USER = 'ADD_USER';

export const addUser = (gravatarEmail) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
  },
});
