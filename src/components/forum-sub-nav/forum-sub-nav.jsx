import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import './forum-sub-nav.scss';
import { selectCurrentUser } from '../../redux/user/user.selectors';
class ForumSubNav extends React.Component {
  state = {
    isLoading: true,
  };
  render() {
    const { history, currentUser } = this.props;
    return (
      <div className="sub-nav">
        <ul className="sub-nav-links">
          <li>
            <Link
              to="/"
              className="sub-nav-link"
              style={
                history.location.pathname === '/'
                  ? { borderBottom: '3px solid #77323b' }
                  : { border: 'none' }
              }
            >
              Forums
            </Link>
          </li>
          <li>
            <Link
              to="/members"
              className="sub-nav-link"
              style={
                history.location.pathname === '/members'
                  ? { borderBottom: '3px solid #77323b' }
                  : { border: 'none' }
              }
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to="/recent-posts"
              className="sub-nav-link"
              style={
                history.location.pathname === '/recent-posts'
                  ? { borderBottom: '3px solid #77323b' }
                  : { border: 'none' }
              }
            >
              Recent Posts
            </Link>
          </li>
          <li>
            <Link
              to="/my-profile"
              className="sub-nav-link"
              style={
                history.location.pathname.includes('profile')
                  ? { borderBottom: '3px solid #77323b' }
                  : { border: 'none' }
              }
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="sub-nav-link"
              style={
                history.location.pathname === '/messages'
                  ? { borderBottom: '3px solid #77323b' }
                  : { border: 'none' }
              }
            >
              Messages
            </Link>
          </li>
          {!currentUser
            ? null
            : currentUser.isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    className="sub-nav-link"
                    style={
                      history.location.pathname === '/admin'
                        ? { borderBottom: '3px solid #77323b' }
                        : { border: 'none' }
                    }
                  >
                    Admin
                  </Link>
                </li>
              )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(ForumSubNav));
