import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  members: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
