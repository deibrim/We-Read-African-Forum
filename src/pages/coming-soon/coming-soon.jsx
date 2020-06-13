import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import logoText from '../../assets/coming-soon/logo-text.svg'
import comingSoonBg from '../../assets/coming-soon/coming-soon-bg.svg'
import './coming-soon.scss'
import MyForm from '../../components/coming-soon-newsletter/my-form';
const url =
    'https://netlify.us4.list-manage.com/subscribe/post?u=e073686d64cdbe2959c070bb0&amp;id=cc90dda4fb';
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
                        <div className="check-junk"><small>(please check your junk mail folder the bookmarks may <br /> be hiding there )</small></div>
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
                    <p className="copyright">
                        &copy; We Read African {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon
