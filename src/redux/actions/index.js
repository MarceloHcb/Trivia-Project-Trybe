export const ADD_USER = 'ADD_USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const addUser = (gravatarEmail, name) => ({
  type: ADD_USER,
  payload: {
    gravatarEmail,
    name,
  },
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
