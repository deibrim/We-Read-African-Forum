import ForumActionTypes from './forum.types';
const INITIAL_STATE = {
  forums: null,
  forumPreviewData: [],
  isEditing: false
};

const ForumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ForumActionTypes.UPDATE_FORUMS:
      return {
        ...state,
        forums: action.payload
      };
    case ForumActionTypes.SET_FORUM_PREVIEW_DATA:
      return {
        ...state,
        forumPreviewData: action.payload
      };
    case ForumActionTypes.TOGGLE_EDITOR:
      return {
        ...state,
        isEditing: !state.isEditing
      };
    default:
      return state;
  }
};

export default ForumReducer;
