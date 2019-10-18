[![NPM](https://nodei.co/npm/react-twitter-authentication.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-twitter-authentication/)

[![npm](https://img.shields.io/npm/dt/react-twitter-authentication.svg)](https://img.shields.io/npm/dt/react-twitter-authentication.svg)
[![Build Status](https://travis-ci.org/berkneis/react-twitter-login.svg?branch=master)](https://travis-ci.org/berkneis/react-twitter-login)
[![Coverage Status](https://coveralls.io/repos/github/berkneis/react-twitter-login/badge.svg?branch=master)](https://coveralls.io/github/berkneis/react-twitter-login?branch=master)
[![npm version](https://badge.fury.io/js/react-twitter-authentication.svg)](https://badge.fury.io/js/react-twitter-authentication)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

# React Twitter Login/Auth Component

> A React Twitter oAUth Callback Component

## Installation

`npm install react-twitter-authentication`
> or
>
`yarn add react-twitter-authentication`

## Usage

```jsx harmony
 <TwitterLogin onFailure={responseErrorTwitter}
               onSuccess={responseSuccessTwitter}
               authenticationUrl="https://example.com/auth/twitter"
               requestUrl="https://example.com/auth/twitter/url">
            Login with Twitter
  </TwitterLogin>
```

#How to setup
requestUrl is the twitter oauth url you created in the backend should be returned.

Value should be

```{"url":"https://api.twitter.com/oauth/authenticate?oauth_token=XXXX"}```
 
The generated url opens in a popup and requests Twitter user permission. The user is then redirected to the callback address defined on twitter.
After the authentication process you do in the backend, json data callback into ```onSuccess```.


## Options

|     params        |  value   |    default value     |                                                                                                         description                                                                                                         |
| :---------------: | :------: | :------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       tag         |  string  |        button        |                                                                        tag that should be used to create element that will be used as loging element                                                                        |
|      text         |  string  | Sign in with Twitter |                                                                                            text that will be shown in component                                                                                             |
|    requestUrl     |  string  |                      |  This address should return a json value. Value should be ```{"url":"https://api.twitter.com/oauth/authenticate?oauth_token=XXXX"}```                                                                                   |
| authenticationUrl |  string  |                      |                                                                                         URL that will be used to get authentication                                                                                          |
|     onFailure     | function |                      |                                                                                function that will be called if user cannot be authenticated                                                                                 |
|     onSuccess     | function |                      |                                                                             function that will be called if user is successfully authenticated                                                                              |
|    disabled       | boolean  |        false         |                                                                                                      disable component                                                                                                      |
|      style        |  object  |                      |                                                                                                        style object                                                                                                         |
|    className      |  string  |                      |                                                                                                  class name for component                                                                                                   |
|   dialogWidth     |  number  |         600          |                                                                                                        dialog width                                                                                                         |
|  dialogHeight     |  number  |         400          |                                                                                                        dialog height                                                                                                        |
|   credentials     |  string  |     same-origin      |                             indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests. Possible values: `omit`, `same-origin`, `include`                              |
|  customHeaders    |  object  |          {}          | custom headers should be object with fields that needs to be sent to user server. Field name will be used as header key and field value as header value. Because of bug in fetch implementation all keys will be lowercase. |
|    children       |   node   |                      |                                                                            this props can be used in order to override default component content                                                                            |
|   forceLogin      |   bool   |        false         |                                                                                force user to authenticate with Twitter username and password                                                                                |
|   screenName      |  string  |                      |                                                                       prefills the username input box of the OAuth login screen with the given value                                                                        |

# Examples

Sample code can be found in [example](https://github.com/berkneis/react-twitter-login/tree/master/example) folder.


# Info

> This package forked from [GenFirst/react-twitter-auth](https://github.com/GenFirst/react-twitter-auth)

# License

react-twitter-auth is released under [MIT License](https://opensource.org/licenses/MIT).
