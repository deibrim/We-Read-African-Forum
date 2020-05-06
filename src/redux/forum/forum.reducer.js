import ForumActionTypes from './forum.types';
const INITIAL_STATE = {
  forums: null
};

const ForumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ForumActionTypes.UPDATE_FORUMS:
      return {
        ...state,
        forums: action.payload
      };
    default:
      return state;
  }
};

export default ForumReducer;
