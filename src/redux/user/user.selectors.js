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
export const selectMember = (memberUrlParam, url) =>
  createSelector([selectUser], (member) => {
    // console.log(member.members)
    return member.members.filter(
      (item, index) =>
        item.id === memberUrlParam
    )
  });
// member.filter(
//       (item, index) =>
//         item.title.toLowerCase() === memberUrlParam.split('-').join(' ')
//     )