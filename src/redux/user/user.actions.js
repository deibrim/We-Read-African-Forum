import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const updateOnlineUsers = (users) => ({
  type: UserActionTypes.UPDATE_ONLINE_USER,
  payload: users,
});
export const setMembers = (members) => ({
  type: UserActionTypes.SET_MEMBERS,
  payload: members,
});
