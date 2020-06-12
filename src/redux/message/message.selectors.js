import { createSelector } from 'reselect';

const selectmessageState = (state) => state.message;

export const selectCurrentChannel = createSelector(
    [selectmessageState],
    (channel) => channel.currentChannel
);
export const selectPrivateChannel = createSelector(
    [selectmessageState],
    (channel) => channel.isPrivateChannel
);