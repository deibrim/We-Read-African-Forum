import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLatestPosts } from '../../redux/forum/forum.selector';
import RecentPostPreview from '../RecentPostPreview/RecentPostPreview';
import Spinner from '../../components/spinner/spinner';
// import Pagination from '../pagination/Pagination'
import ForumStatistics from '../forum-statistic/forum-statistic';
import './recent-posts.scss';

const RecentPosts = ({ latestTopics }) => {
  // const [state, setState] = useState({ currentPage: 1 })
  // const changeCurrentPage = numPage => {
  //     setState({ currentPage: numPage });
  //     //fetch a data
  //     //or update a query to get data
  // };
  return (
    <div className="recent-posts">
      <div className="bar">
        <span>Post</span>
        <span>Last Message</span>
      </div>
      <div className="post-container">
        {!latestTopics ? <Spinner /> : null}
        {latestTopics.length === 0 ? (
          <div style={{ display: 'flex', padding: '20px 0' }}>
            {' '}
            <span style={{ margin: 'auto', lineHeight: '50px' }}>
              No Posts Yet
            </span>{' '}
          </div>
        ) : null}
        {latestTopics
          .filter((item, index) => index < 10)
          .map((item, index) => (
            <RecentPostPreview key={index} data={item.latest_post} />
          ))}
      </div>
      {/* <Pagination
                currentPage={state.currentPage}
                totalPages={10}
                changeCurrentPage={changeCurrentPage}
                theme="square-fill"
            /> */}
      <ForumStatistics />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  latestTopics: selectLatestPosts,
});

export default withRouter(connect(mapStateToProps)(RecentPosts));
