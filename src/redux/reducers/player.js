import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default player;
