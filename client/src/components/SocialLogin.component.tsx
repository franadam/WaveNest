import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import './SocialLogin.css';

interface Props {
  formType: boolean;
}

export const SocialLogin: React.FC<Props> = ({ formType }) => {
  return (
    <div className="auth_container">
      <div className="social_login">
        <div className="social_login_item google">
          <a
            href="http://localhost:5000/api/auth/google"
            className="social_login_item_link"
          >
            <GoogleIcon color="inherit" className="icon" />
            <h5>{formType ? 'Register' : 'Login'} with Google</h5>
          </a>
        </div>
        <div className="social_login_item github">
          <a
            href="http://localhost:5000/api/auth/google"
            className="social_login_item_link"
          >
            <GitHubIcon color="inherit" className="icon" />
            <h5>{formType ? 'Register' : 'Login'} with GitHub</h5>
          </a>
        </div>
      </div>
    </div>
  );
};
