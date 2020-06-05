import ForumActionTypes from './forum.types';

export const updateForums = forums => ({
  type: ForumActionTypes.UPDATE_FORUMS,
  payload: forums
});
export const setForumPreviewData = forumPreviewData => ({
  type: ForumActionTypes.SET_FORUM_PREVIEW_DATA,
  payload: forumPreviewData
});
export const toggleEditor = isShow => ({
  type: ForumActionTypes.TOGGLE_EDITOR,
  payload: isShow
});
