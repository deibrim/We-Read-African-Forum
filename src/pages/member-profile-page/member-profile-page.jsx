import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { selectMember } from '../../redux/user/user.selectors';
import { auth } from '../../firebase/firebase.utils';
import posts from '../../assets/activities/posts.svg';
import star from '../../assets/activities/star.svg';
import calender from '../../assets/info/calender.svg';
import location from '../../assets/info/location.svg';
import time from '../../assets/info/time.svg';
import website from '../../assets/info/website.svg';
import Loader from '../../components/loader/loader';
import StarRating from '../../components/rating/rating';
import MemberActivityBox from '../../components/member-activity-box/member-activity-box';
import './member-profile-page.scss';
const MemberProfilePage = ({ currentUser, history, member }) => {

    const [state, setState] = useState({ cover: '', pp: '' });
    useEffect(() => {

    }, [currentUser]);
    const handleSignout = () => {
        auth.signOut();
        history.push(`/`);
    };

    return member[0] ? (
        <div className="member-profile-page">
            <Helmet>
                <title>We Read African &mdash; Profile</title>
                <meta property="og:title" content="We Read African &mdash; Profile" />
                <meta property="og:type" content="website" />
                <meta name="description" content=" " />
                <meta property="og:site_name" content="We Read African" />
                <meta
                    property="og:url"
                    content="https://www.wereadafrican.com/user-profile"
                />
            </Helmet>
            <div className="profile-page-header">
                <div className="profile-page-header-image">
                    <div className="cover-container">
                        {member[0].cover !== '' ? <img className="cover-image" src={member[0].cover} alt="cover" /> : null}
                    </div>
                </div>
                <div className="profile-pic_buttons">
                    <div className="group">
                        <div
                            className="profile-pic"
                            style={member[0].profile_pic !== '' ? { backgroundImage: `url(${member[0].profile_pic} )` } : {}}
                        >
                        </div>
                        <br />
                        <span>{member[0].displayName ? member[0].displayName : ''}</span>
                    </div>
                    <div className="buttons">
                        <Link to="/message">
                            <span className="message">
                                Send Message
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="user-desc_info">
                <div className="rate">
                    <span>Member</span>
                    <span className="demacator">|</span>
                    <StarRating rating={2} />
                </div>
                <div className="desc">
                    <span className="bio">{member[0].bio ? member[0].bio : ''}</span>
                </div>
                <div className="info">
                    <span className="joined">
                        {' '}
                        <img src={calender} alt="calender icon" /> Joined: {member[0].createdAt ? new Date(member[0].createdAt.seconds * 1000).toString().split(' ')
                            .slice(1, 4)
                            .join(' ') : "January 2020"}
                    </span>
                    <span className="link">
                        {' '}
                        <img src={website} alt="link icon" />{' '}
                        <a href={member[0].website ? member[0].website : ''}>
                            {member[0].website ? member[0].website : ''}
                        </a>
                    </span>
                    <span className="location">
                        {' '}
                        <img src={location} alt="location icon" />
                        {member[0].location ? member[0].location : ''}
                    </span>
                    <span className="timezone">
                        {' '}
                        <img src={time} alt="time icon" /> {member[0].createdAt ? new Date(member[0].createdAt.seconds * 1000).toString().split(' ')
                            .slice(5, 6)
                            .join(' ') : "GMT +1"}
                    </span>
                </div>
                <br />
                <span className="signature">
                    {member[0].signature ? member[0].signature : ''}
                </span>
            </div>
            <div className="member-activity">
                <h4>Member Activity</h4>
                <div className="boxes">
                    <MemberActivityBox
                        data={{ img: posts, num: member[0].posts ? member[0].posts.length : 0, text: 'Forum Posts' }}
                    />
                    <MemberActivityBox
                        data={{ img: star, num: 1, text: 'Rating' }}
                    />
                </div>
            </div>
        </div>
    ) : (
            <Loader />
        );
};
const mapStateToProps = (state, ownProps) => {
    return {
        member: selectMember(
            ownProps.match.params.memberId,
            ownProps.match.url
        )(state),
        currentUser: state.user.currentUser
    };
};
// const mapDispatchToProps = (dispatch) => ({
//       setCurrentReading: (reading) => dispatch(setCurrentReading(reading))
// });
export default connect(mapStateToProps)(MemberProfilePage);
