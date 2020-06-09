import React, { Component } from 'react';
import './MessageHeader.scss';
class MessageHeader extends Component {
    render() {
        const { channelName, handleSearchChange, searchLoading } = this.props;

        return (
            <div className="Message-Header">
                <header >
                    <span className="user-name">
                        {channelName}
                    </span>
                    {/* <input
                        name='searchTerm'
                        placeholder='Search Messages...'
                        onChange={handleSearchChange}
                    /> */}
                </header>
            </div>
        );
    }
}

export default MessageHeader;
