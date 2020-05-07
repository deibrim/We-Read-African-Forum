import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SignUp from '../../components/sign-up/sign-up';
import instagram from '../../assets/socials/instagram.svg';
import twitter from '../../assets/socials/twitter.svg';
import facebook from '../../assets/socials/facebook.svg';
import backArrow from '../../assets/backArrow.svg';
import weR from '../../assets/weR.svg';
import pattern from '../../assets/pattern.svg';
import './sign-up-page.scss';

const SignUpPage = () => {
  return (
    <div className="sign-in-page">
      <Helmet>
        <title>We Read African &mdash; Sign Up</title>
        <meta property="og:title" content="We Read African &mdash; Sign Up" />
        <meta property="og:type" content="website" />
        <meta name="description" content="" />
        <meta property="og:site_name" content="We Read African" />
        <meta
          property="og:url"
          content="https://www.wereadafrican.com/signup"
        />
      </Helmet>
      <Link to="/" className="back container">
        <img src={backArrow} alt="Back Arrow Icon" />
        <span>Back to home</span>
      </Link>
      <div className="left-right container">
        <div className="left">
          <img
            className="logo"
            src={weR}
            alt="We Read African Logo with Text"
          />
          <div className="join-tribe">
            <p>
              Join the WeReadAfrican Tribe. Register to be a part of the forum.
            </p>
            <div className="social">
              <img className="icon" src={instagram} alt="Instagram Icon" />
              <img className="icon" src={twitter} alt="Twitter Icon" />
              <img className="icon" src={facebook} alt="Facebook Icon" />
            </div>
          </div>
        </div>
        <div className="right">
          {/* <div className="vertical"></div>
          <div className="horizontal"></div> */}
          <SignUp />
        </div>
      </div>
      <div className="pattern">
        <img src={pattern} alt="Pattern" />
      </div>
    </div>
  );
};

export default SignUpPage;
