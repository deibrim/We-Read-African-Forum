import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectCurrentChannel,
  selectPrivateChannel,
} from '../../redux/message/message.selectors';
import SidePanel from '../../components/SidePanel/SidePanel';
import Spinner from '../../components/spinner/spinner';
// import Loader from '../../components/loader/loader'
import Messages from '../../components/Message/Messages';

import './message.scss';

const Message = ({ currentUser, currentChannel, isPrivateChannel }) => {
  return currentUser ? (
    <div className="message">
      <div className="sidebar">
        <SidePanel key={currentUser && currentUser.id} {...{ currentUser }} />
      </div>
      <div className="message-panel">
        <Messages
          key={currentChannel && currentChannel.id}
          {...{ currentChannel, currentUser, isPrivateChannel }}
        />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel,
  isPrivateChannel: selectPrivateChannel,
});
export default connect(mapStateToProps)(Message);
