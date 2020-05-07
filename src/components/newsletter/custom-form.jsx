import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import MyForm from './my-form';
import './custom-form.scss';
const url =
  'https://netlify.us4.list-manage.com/subscribe/post?u=e073686d64cdbe2959c070bb0&amp;id=cc90dda4fb';

const CustomForm = ({ sidebar }) => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <div>
        <MyForm
          onSubmitted={formData => subscribe(formData)}
          sidebar={sidebar}
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
);
export default CustomForm;
