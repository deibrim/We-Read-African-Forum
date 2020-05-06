import ForumActionTypes from './forum.types';

export const updateForums = forums => ({
  type: ForumActionTypes.UPDATE_FORUMS,
  payload: forums
});
