import React, { Component } from 'react';
import DirectMessages from '../DirectMessages/DirectMessages';
import './SidePanel.scss'

class SidePanel extends Component {
    render() {
        const { currentUser } = this.props;
        return (
            <div
                style={{ fontSize: '1.2rem' }}
            >
                <DirectMessages {...{ currentUser }} />
            </div>
        );
    }
}

export default SidePanel;
