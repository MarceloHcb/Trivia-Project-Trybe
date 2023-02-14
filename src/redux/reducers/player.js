import { ADD_USER, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload.totalScore,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default player;
