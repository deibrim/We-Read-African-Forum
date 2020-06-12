import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase.utils';
import { firestore } from '../../firebase/firebase.utils';
import { setCurrentChannel, setPrivateChannel } from '../../redux/message/message.actions';
import './DirectMessages.scss'

class DirectMessages extends Component {
    state = {
        users: [],
        user: this.props.currentUser,
        usersRef: firestore.collection('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence'),
        activeChannel: ''
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.id);
        }
    }

    addListeners = currentUserId => {
        this.state.usersRef.onSnapshot(snapshot => {
            let loadedUsers = [];
            snapshot.docs.forEach((doc) => {
                if (currentUserId !== doc.data().id) {
                    let user = doc.data();
                    user['status'] = 'offline';
                    loadedUsers.push(user);
                }
            })
            this.setState({ users: loadedUsers });
        });
    }

    addStatusToUser = (userId, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {
            if (user.id === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`
            }

            return acc.concat(user);

        }, []);

        this.setState({ users: updatedUsers });
    }

    isUserOnline = user => user.status === 'online';

    getChannelId = userId => {
        const currentUserId = this.state.user.id;

        return userId < currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    }

    changeChannel = user => {
        const channelId = this.getChannelId(user.id);
        const channelData = {
            id: channelId,
            name: user.displayName
        };

        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.setActiveChannel(user.id);
    }

    setActiveChannel = userId => {
        this.setState({ activeChannel: userId });
    }

    render() {
        const { users, activeChannel } = this.state;
        // const { isUserOnline } = this;
        return (
            <div className='direct-message'>
                {this.state.users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => this.changeChannel(user)}
                        style={{ opacity: 0.7, }}
                        className="user-messanger-preview"
                    >
                        <img src={user.profile_pic && user.profile_pic} alt="" />
                        <div className="name-text-preview">
                            <span className="name"><strong>{user.displayName}</strong></span>
                            <br />
                            <span className="text-preview"><small>Hey bro</small></span>
                        </div>
                        <div className="time-noty">
                            <span className="time"><small>12:03am</small></span>
                            <br />
                            <span className="noty">1</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(DirectMessages);
