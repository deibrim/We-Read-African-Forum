import MessageActionTypes from './message.types';
const INITIAL_STATE = {
    currentChannel: null,
    isPrivateChannel: false
};

const MessageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessageActionTypes.SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload.currentChannel
            }
        case MessageActionTypes.SET_PRIVATE_CHANNEL:
            return {
                ...state,
                isPrivateChannel: action.payload.isPrivateChannel
            }
        default:
            return state;
    }
}

export default MessageReducer;