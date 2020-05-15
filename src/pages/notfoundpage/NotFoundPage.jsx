import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './NotFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [isShow, setisShow] = useState(true);
  const handleToggleSideNav = () => {
    setisShow(!isShow);
    !isShow
      ? (document.documentElement.style.overflowY = 'hidden')
      : (document.documentElement.style.overflowY = 'scroll');
  };
  return (
    <div className="NotFound">
      <Helmet>
        <title>We Read African &mdash; 404 Error</title>
        <meta property="og:title" content="We Read African &mdash; 404 Error" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta property="og:site_name" content="We Read African" />
      </Helmet>
      <div className="notfoundHeading">
        <p>Ooops...</p>
        <h2>“To Get Lost Is To Learn The Way”</h2>
        <h5>-African Proverb</h5>
        <div id="notfoundIllustration"></div>
      </div>
      <div className="redirectSection">
        <p>
          Not to worry, try one of these links to reunite with the rest of the
          tribe
        </p>
        <div className="redirectSectionButtons">
          <Link to="/blog" onClick={handleToggleSideNav}>
            Visit Blog
          </Link>
          <Link to="/">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
