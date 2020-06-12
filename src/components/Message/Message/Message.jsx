import React from 'react';
import moment from 'moment';
import './Message.scss';

const Message = ({ message, user }) => {
    const { timestamp, content } = message;
    const { avatar } = message.user;
    return (
        <div className={`${message.user.id === user.id ? 'message-self' : ''} 'message-preview'`} >
            <div className={`${message.user.id === user.id ? 'self' : 'group'}`} style={message.user.id === user.id ? { marginLeft: 'auto' } : {}}>
                <img src={avatar} className='avattar' />
                <div className={`message-content`}>
                    <span className="time-stamp">{moment(timestamp).fromNow()}</span>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
};

export default Message;
