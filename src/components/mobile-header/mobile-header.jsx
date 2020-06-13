import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import SideNav from '../side-nav/side-nav';
import './mobile-header.scss';
import ForumSubNav from '../forum-sub-nav/forum-sub-nav';
const MobileHeader = ({ showSearch }) => {
  const [isShow, setisShow] = useState(false);
  const handleToggleSideNav = () => {
    setisShow(!isShow);
    !isShow
      ? (document.documentElement.style.overflowY = 'hidden')
      : (document.documentElement.style.overflowY = 'scroll');
  };
  return (
    <div className="mobile-header-container">
      <div className="mobile-header">
        <div className="menu">
          {isShow ? null : (
            <img src={menu} alt="Menu Icon" onClick={handleToggleSideNav} />
          )}
        </div>
        <div className="brand">
          <Link to="/">
            {' '}
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <span className="search">
          <img src={search} alt="Search Icon" onClick={showSearch} />
        </span>
        {isShow ? <SideNav handleToggleSideNav={handleToggleSideNav} /> : null}
      </div>
      <ForumSubNav />
    </div>
  );
};

export default MobileHeader;
