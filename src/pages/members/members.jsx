import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { setMembers } from '../../redux/user/user.actions';
import { firestore } from '../../firebase/firebase.utils';
import MembersView from '../../components/members/members'
// import Loader from '../../components/loader/loader'
import MemberProfilePage from '../member-profile-page/member-profile-page';
import './members.scss';
import ForumSideBar from '../../components/ForumSideBar/ForumSideBar';
const Members = ({ setMembers, match }) => {
  useEffect(() => {
    const fetchData = async () => {
      const membersRef = firestore.collection('users');
      membersRef.onSnapshot(async (snapshot) => {
        const membersArr = [];
        snapshot.docs.forEach((doc) => {
          membersArr.push(doc.data());
        });
        setMembers(membersArr);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="members-page">
      <div className="member-routes">
        <Route exact path={`${match.path}`} component={MembersView} />
        <Route exact path={`/members/:memberId`} component={MemberProfilePage} />
      </div>
      <ForumSideBar />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setMembers: (members) => dispatch(setMembers(members))
});

export default connect(null, mapDispatchToProps)(Members);
