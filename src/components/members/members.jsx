import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setMembers } from '../../redux/user/user.actions';
import {
    selectCurrentUser,
    selectMembers,
} from '../../redux/user/user.selectors';
import { firestore } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader'
// import Pagination from "../../components/pagination/Pagination"
import './members.scss';
import MemberPreview from '../../components/member-preview/member-preview';
const MembersView = ({ members, setMembers }) => {
    // const [state, setState] = useState({ currentPage: 1 })
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
    // const changeCurrentPage = numPage => {
    //     setState({ currentPage: numPage });
    //     //fetch a data
    //     //or update a query to get data
    // };

    return (
        <div className="members">
            <div className="head">
                <span className="avatar">Avatar</span>
                <span className="info">Member Info</span>
                <span className="joined_at">Registered Date</span>
            </div>
            {members ? members.map((item, index) => (
                <MemberPreview key={index} data={item} />
            )) : <Loader />}
            {/* <Pagination
                currentPage={state.currentPage}
                totalPages={10}
                changeCurrentPage={changeCurrentPage}
                theme="square-fill"
            /> */}
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    members: selectMembers,
});
const mapDispatchToProps = (dispatch) => ({
    setMembers: (members) => dispatch(setMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersView);
