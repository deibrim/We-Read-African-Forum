import React, { Component } from 'react';
import firebase from '../../firebase/firebase.utils';
import MessageHeader from './MessageHeader/MessageHeader'
import MessageForm from './MessageForm/MessageForm';
import Message from './Message/Message';
import './Messages.scss'
import MessageLoading from '../MessageLoading/MessageLoading';
class Messages extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messages: [],
        messagesLoading: true,
        progressBar: false,
        searchTerm: '',
        searchLoading: false,
        searchResults: [],
        isPrivateChannel: this.props.isPrivateChannel,
        privateMessagesRef: firebase.database().ref('privateMessages')
    }

    componentDidMount() {
        const { channel, user } = this.state;
        if (channel && user) {
            this.addListeners(channel.id);
        }
    }
    addMessageListener = channelId => {
        let loadedmessages = [];
        const ref = this.getMessagesRef();

        ref.child(channelId).on('child_added', snap => {
            loadedmessages.push(snap.val());
            this.setState({ messages: loadedmessages, messagesLoading: false });
        });
    }

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, isPrivateChannel } = this.state;

        return isPrivateChannel ? privateMessagesRef : messagesRef;
    }

    handleSearchChange = event => {
        let searchTerm = event.target.value;

        this.setState({ searchTerm, searchLoading: true }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');

        const searchResults = channelMessages.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);

        this.setState({ searchResults });
        setTimeout(() => this.setState({ searchLoading: false }), 1000);
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    }


    isProgressBarVisible = percent => {
        if (percent > 0) {
            this.setState({ progressBar: true })
        }
    }

    displayMessageSkeleton = loading =>
        loading ? (
            <React.Fragment>
                {[...Array(6)].map((_, i) => (
                    <MessageLoading key={1} />
                ))}
            </React.Fragment>
        ) : null;
    render() {

        const {
            messagesRef,
            channel,
            user,
            messages,
            progressBar,
            searchTerm,
            searchResults,
            searchLoading,
            isPrivateChannel,
            messagesLoading
        } = this.state;

        const { isProgressBarVisible, handleSearchChange, getMessagesRef } = this;

        const displayMessages = messages => {
            if (messages.length > 0) {
                return messages.map(message => <Message key={message.timestamp} message={message} user={user} />);
            }

            return null;
        }
        const displayChannelName = channel => {
            return channel ? channel.name : '';
        }
        return channel ? (
            <div className='message-component'>
                <div className="main">
                    <MessageHeader
                        {...{ handleSearchChange, searchLoading, isPrivateChannel }}
                        channelName={displayChannelName(channel)}
                    />
                    <div>
                        <div className={progressBar ? 'messages__progress' : 'messages'}>
                            {messagesLoading ? <div>
                                <br />
                                <br />
                                <br />
                                {this.displayMessageSkeleton(messagesLoading)}
                            </div> : null}

                            {searchTerm ? displayMessages(searchResults) : displayMessages(messages)}
                        </div>
                    </div>
                </div>
                <MessageForm
                    {...{ messagesRef, isProgressBarVisible, isPrivateChannel, getMessagesRef }}
                    currentUser={user}
                    currentChannel={channel}
                />
            </div>
        ) : (<div className="no-channel">
            <h1>Messages</h1>
        </div>);
    }
}

export default Messages;
