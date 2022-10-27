import React from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';




const Linkdin = () => {

    const onLoginSuccess = (code) => {
        console.log(code);
      }



    return (
        <LinkedIn
          clientId="86vhj2q7ukf83q"
          redirectUri={`${window.location.origin}/linkedin`}
          onSuccess={onLoginSuccess}
          onError={(error) => {
            console.log(error);
          }}
        >
          {({ linkedInLogin }) => (
            <img
              onClick={linkedInLogin}
              src={linkedin}
              alt="Sign in"
              style={{ maxWidth: '190px', cursor: 'pointer' }}
            />
          )}
        </LinkedIn>
      );
}

export default Linkdin