import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  auth,
  firestore,
  userPresence,
  createUserProfileDocument,
} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { setForumPreviewData } from './redux/forum/forum.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';
/*==============================*/
/*PAGES*/
/*==============================*/
import UserProfilePage from './pages/user-profile-page/user-profile-page';
import SignInPage from './pages/sign-in/sign-in-page';
import SignUpPage from './pages/sign-up/sign-up-page';
import NotFound from './pages/notfoundpage/NotFoundPage';
import MobileHeader from './components/mobile-header/mobile-header';
import Editprofile from './pages/editprofile/editprofile';

import './App.scss';
import Forum from './pages/forum/forum';
import Members from './pages/members/members';
import Message from './pages/message/message';
import RecentPost from './pages/recent-post/recent-post';

class App extends React.Component {
  state = {
    isLoading: false,
    isShowSearch: false,
    hasError: false,
  };
  unSubscribeFromAuth = null;
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(info);
  }
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
        userPresence();
      }
      // this.props.setCurrentUser(userAuth);
    });
    const forumPriviewData = firestore.collection('forum_preview_data');
    forumPriviewData.onSnapshot(async snapshot => {
      const forums = []
      snapshot.docs.forEach(doc => {
        forums.push(doc.data());
      });
      this.props.setForumPreviewData(forums)
    });
  }

  // componentWillUnmount() {
  //   this.unSubscribeFromAuth();
  // }
  render() {
    const { currentUser, history } = this.props;
    return (
      <div
        className="App"
        style={
          currentUser
            ? { paddingTop: '110px' }
            : history.location.pathname === '/notfound'
              ? { paddingTop: 0 }
              : { paddingTop: '160px' }
        }
      >
        {history.location.pathname === '/signin' ? null : history.location
          .pathname === '/notfound' ? null : history.location.pathname ===
            '/signup' ? null : (
              <div className="showing">
                <div className="desktop">
                  <Header showSearch={this.handleSearchShow} />
                </div>
                <div className="mobile">
                  <MobileHeader showSearch={this.handleSearchShow} />
                </div>
              </div>
            )}
        <div className="wrapper">
          {this.state.isLoading ? (
            <Loader />
          ) : (
              <Switch>
                <Route
                  exact
                  path="/signin"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignInPage />
                  }
                />
                <Route
                  exact
                  path="/signup"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignUpPage />
                  }
                />
                <Route exact path="/my-profile" component={UserProfilePage} />
                <Route
                  exact
                  path="/edit-profile"
                  render={() =>
                    currentUser ? <Editprofile /> : <Redirect to="/my-profile" />
                  }
                />
                <Route path="/members" component={Members} />

                <Route exact path="/recent-posts" component={RecentPost} />
                <Route exact path="/messages" component={Message} />
                <Route path="/" component={Forum} />
                <Route component={NotFound} />

              </Switch>
            )}
        </div>
        {history.location.pathname === '/signin' ? null : history.location
          .pathname === '/signup' ? null : history.location.pathname ===
            '/notfound' ? null : history.location.pathname ===
              '/user-profile' ? null : (
                <Footer />
              )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setForumPreviewData: (forumPreviewData) => dispatch(setForumPreviewData(forumPreviewData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
