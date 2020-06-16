import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import logoText from '../../assets/coming-soon/logo-text.svg'
import comingSoonBg from '../../assets/coming-soon/coming-soon-bg.svg'
import pinterest from '../../assets/coming-soon/pintrest.svg';
import instagram from '../../assets/coming-soon/instagram.svg';
import facebook from '../../assets/coming-soon/facebook.svg';
import twitter from '../../assets/coming-soon/twitter.svg';
import MyForm from '../../components/coming-soon-newsletter/my-form';
import './coming-soon.scss';
const url =
    'https://wereadafrican.us10.list-manage.com/subscribe/post?u=d8b06d9729c203b746c0d2aaa&amp;id=007e45ae63';

const ComingSoon = () => {
    return (
        <div className="coming-soon-page" style={{ backgroundImage: `url(${comingSoonBg})` }}>
            <div className="coming-soon-container">
                <div className="coming-soon">
                    <img src={logoText} alt="" />
                    <br />
                    <span className="desc">The African Litrature blog and forum you've been waiting for</span>
                    <br />
                    <br />
                    <span className="is-coming">IS COMING SOON...</span>
                    <br />
                    <br />
                    <div className="coming-soon-newsletter">
                        <p><small>Be The first to know when We Read African launches and download a FREE copy of printable bookmarks</small></p>
                        <div className="check-junk"><small>(please check your junk mail folder the bookmarks may be hiding there )</small></div>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <div>
                                    <MyForm
                                        onSubmitted={formData => subscribe(formData)}
                                    />
                                    {status === 'success' ? (
                                        <span className="success">
                                            Subscribed{' '}
                                            <span role="img" aria-label="check">
                                                ✔
            </span>
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        />
                        <br />
                        <span><small>*By clicking on the button for FREE bookmarks you agree to be subscribed to our mailing list</small></span>
                    </div>
                    <div className="socials">
                        <a href="https://www.pinterest.co.uk/wereadafrican/" target="_blank" className="social pin"><img src={pinterest} alt="pinterest icon" /></a>
                        <a href="https://www.facebook.com/wereadafrican" target="_blank" className="social facebook"><img src={facebook} alt="facebook icon" /></a>
                        <a href="https://www.instagram.com/wereadafrican" target="_blank" className="social instagram"><img src={instagram} alt="instagram icon" /></a>
                        <a href="https://www.twitter.com/wereadafrican" target="_blank" className="social twitter"><img src={twitter} alt="twitter icon" /></a>
                    </div>
                    <p className="copyright">
                        &copy; We Read African {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon
