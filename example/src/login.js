import React from 'react';
import {observer} from 'mobx-react-lite'
import TwitterLogin from 'react-twitter-authentication/lib/react-twitter-login-component.js';

const Login = observer(() => {
    
    const responseErrorTwitter = async (response) => {
        console.log(response);
    };
    const responseSuccessTwitter = async (response) => {
        //do something
        console.log(res.resources);
    };

    return (
        <TwitterLogin onFailure={responseErrorTwitter}
                      onSuccess={responseSuccessTwitter}
                      credentials="include"
                      customHeaders={
                          {
                              "X-Requested-With": "XMLHttpRequest",
                          }
                      }
                      authenticationUrl="https://example.com/auth/twitter"
                      requestUrl="https://example.com/auth/twitter/url">
            Login with Twitter
        </TwitterLogin>
    );

});


export default Login;