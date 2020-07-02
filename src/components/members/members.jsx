import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectMembers,
} from '../../redux/user/user.selectors';
// import Loader from '../../components/loader/loader'
import Spinner from '../../components/spinner/spinner';
import './members.scss';
import MemberPreview from '../../components/member-preview/member-preview';
import ForumStatistics from '../forum-statistic/forum-statistic';
const MembersView = ({ members, currentUser }) => {
  return (
    <div className="members">
      <div className="head">
        <span className="avatar">Avatar</span>
        <span className="info">Member Info</span>
        <span className="joined_at">Registered Date</span>
      </div>
      <div className="member-preview-container">
        {members ? (
          members.map((item, index) => (
            <MemberPreview key={index} data={item} />
          ))
        ) : (
          <Spinner />
        )}
      </div>

      <ForumStatistics />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  members: selectMembers,
});

export default connect(mapStateToProps)(MembersView);
