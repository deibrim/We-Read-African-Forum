import React, { Component } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { Picker, emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import firebase from '../../../firebase/firebase.utils';
import emoji from '../../../assets/messaging/emoji.svg'
import send from '../../../assets/messaging/send.svg'
import './MessageForm.scss'

export class MessageForm extends Component {
    state = {
        message: '',
        loading: false,
        errors: [],
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        modal: false,
        uploadState: '',
        uploadTask: null,
        percentUploaded: 0,
        emojiPicker: false
    };


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleTogglePicker = () => {
        this.setState({ emojiPicker: !this.state.emojiPicker })
    }
    handleAddEmoji = (emoji) => {
        const oldMessage = this.state.message
        this.setState({ message: `${oldMessage} ${emoji.native}`, emojiPicker: false })
        setTimeout(() => this.messageInputRef.focus(), 0)
    }
    createMessage = fileUrl => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            content: this.state.message,
            user: {
                id: this.state.user.id,
                name: this.state.user.displayName,
                avatar: this.state.user.profile_pic ? this.state.user.profile_pic : 'https://img.favpng.com/23/0/3/computer-icons-user-profile-clip-art-portable-network-graphics-png-favpng-YEj6NsJygkt6nFTNgiXg9fg9w.jpg'
            },
        }

        return message;
    }

    sendMessage = () => {
        const { createMessage } = this;
        const { message, channel } = this.state;
        const { getMessagesRef } = this.props;

        const { id } = channel;
        // console.log(id);

        if (message) {
            this.setState({ loading: true });
            getMessagesRef()
                .child(id)
                .push()
                .set(createMessage())
                .then(() => {
                    this.setState({ loading: false, message: '', errors: [] })
                })
                .catch(err => {
                    let errors = this.state.errors.concat(err);
                    this.setState({ loading: false, errors });
                    console.log(err);

                })
        } else {
            let errors = this.state.errors.concat({ message: 'Add a message' });
            this.setState({ errors });
            console.log(errors);

        }
    }

    render() {
        const { errors, message, loading, emojiPicker } = this.state;
        const { handleChange, sendMessage, openModal } = this;

        return (
            <div className='message_form'>
                <div className="emo-picker">
                    {emojiPicker && (<Picker set="apple" className="emojipicker" title="Select Emoji" onSelect={this.handleAddEmoji} emoji="poin_up" />)}
                </div>
                <div className="group-send">
                    <span className="emoji-handler" onClick={this.handleTogglePicker}><img className="emo-pic" src={emoji} alt="emoji pick" /></span>
                    <input
                        name='message'
                        value={message}
                        ref={node => (this.messageInputRef = node)}
                        style={{ marginBottom: '0.7em' }}
                        placeholder='Write your message...'
                        onChange={handleChange}
                        className="message-input"
                    />
                    <div className="buttons">
                        <button
                            className="send-message"
                            onClick={sendMessage}
                        ><img src={send} alt="send icon" /></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageForm;
