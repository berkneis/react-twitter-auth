import React, { Component } from "react";
import PropTypes from "prop-types";
import "whatwg-fetch";
import "url-search-params-polyfill";

class TwitterLogin extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    return this.getRequestToken();
  }

  getHeaders() {
    const headers = Object.assign({}, this.props.customHeaders);
    headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    return headers;
  }

  getRequestToken() {
    var popup = this.openPopup();

    return window
      .fetch(this.props.requestUrl, {
        method: "POST",
        credentials: this.props.credentials,
        headers: this.getHeaders()
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let authenticationUrl = data.url;

        if (this.props.screenName) {
          authenticationUrl = `${authenticationUrl}&screen_name=${
            this.props.screenName
          }`;
        }

        popup.location = authenticationUrl;
        this.polling(popup);
      })
      .catch(error => {
        popup.close();
        return this.props.onFailure(error);
      });
  }

  openPopup() {
    const w = this.props.dialogWidth;
    const h = this.props.dialogHeight;
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;

    return window.open(
      "",
      "",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }

  polling(popup) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        this.props.onFailure(new Error("Popup has been closed by user"));
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (
          !popup.location.hostname.includes("api.twitter.com") &&
          !popup.location.hostname == ""
        ) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);

            const oauthToken = query.get("oauth_token");
            const oauthVerifier = query.get("oauth_verifier");

            closeDialog();
            return this.getOauthToken(oauthVerifier, oauthToken);
          } else {
            closeDialog();
            return this.props.onFailure(
              new Error("OAuth redirect has occurred")
            );
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in IE.
      }
    }, 500);
  }

  getOauthToken(oAuthVerifier, oauthToken) {
    return window
      .fetch(
        `${
          this.props.authenticationUrl
        }?oauth_verifier=${oAuthVerifier}&oauth_token=${oauthToken}`,
        {
          method: "POST",
          credentials: this.props.credentials,
          headers: this.getHeaders()
        }
      )
      .then(response => response.json())
      .then (json => this.props.onSuccess({resources:json}))
      .catch(error => {
        return this.props.onFailure(error);
      });
  }

  render() {
    const twitterButton = React.createElement(
      this.props.tag,
      {
        onClick: this.onButtonClick,
        style: this.props.style,
        disabled: this.props.disabled,
        className: this.props.className
      },
      this.props.children ? this.props.children : this.props.text
    );
    return twitterButton;
  }
}

TwitterLogin.propTypes = {
  tag: PropTypes.string,
  text: PropTypes.string,
  authenticationUrl: PropTypes.string.isRequired,
  requestUrl: PropTypes.string.isRequired,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  dialogWidth: PropTypes.number,
  dialogHeight: PropTypes.number,
  credentials: PropTypes.oneOf(["omit", "same-origin", "include"]),
  customHeaders: PropTypes.object,
  forceLogin: PropTypes.bool,
  screenName: PropTypes.string
};

TwitterLogin.defaultProps = {
  tag: "button",
  text: "Sign in via Twitter",
  disabled: false,
  dialogWidth: 600,
  dialogHeight: 400,
  credentials: "same-origin",
  customHeaders: {},
  forceLogin: false,
  screenName: ""
};

export default TwitterLogin;