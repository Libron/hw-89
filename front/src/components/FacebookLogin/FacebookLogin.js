import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "reactstrap";
import {NotificationManager} from 'react-notifications';
import {facebookLogin} from "../../store/actions/usersActions";
import {connect} from "react-redux";

class FacebookLogin extends Component {
    facebookLogin = data => {
        if (data.error) {
            NotificationManager.error('Something went wrong !');
        } else if (!data.name) {
            NotificationManager.warning('You pressed cancel')
        } else {
            this.props.facebookLogin(data);
        }
    };

    render() {
        return (
            <FacebookLoginButton
                appId="1340053619482671"
                callback={this.facebookLogin}
                fields="name,email,picture"
                render={renderProps => (
                    <Button onClick={renderProps.onClick}>Sign in with Facebook</Button>
                )}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
   facebookLogin: userData => dispatch(facebookLogin(userData))
});

export default connect(null, mapDispatchToProps)(FacebookLogin);