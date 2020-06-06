import { createSelector } from 'reselect';

const selectForum = state => state.forum;
export const selectAllForumTopics = createSelector(
  [selectForum],
  forum => forum.forums
);
export const selectForumPreviewData = createSelector(
  [selectForum],
  forum => forum.forumPreviewData
);
export const selectToggleEdit = createSelector(
  [selectForum],
  forum => forum.isEditing
);
