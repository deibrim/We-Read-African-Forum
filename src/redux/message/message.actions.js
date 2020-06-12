import MessageActionTypes from './message.types';

export const setCurrentChannel = channel => {
    return {
        type: MessageActionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setPrivateChannel = isPrivateChannel => {
    return {
        type: MessageActionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}