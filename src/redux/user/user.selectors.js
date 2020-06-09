import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
export const selectMembers = createSelector(
  [selectUser],
  (members) => members.members
);

export const selectOnlineUsers = createSelector(
  [selectUser],
  (user) => user.onlineUsers
);

export const selectMember = (memberUrlParam, url) =>
  createSelector([selectUser], (member) => {
    return member.members.filter(
      (item, index) =>
        item.id === memberUrlParam
    )
  });