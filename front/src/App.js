import {connect} from "react-redux";
import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router";
import {Container} from "reactstrap";
import {NotificationContainer} from "react-notifications";

import {logoutUser} from "./store/actions/usersActions";
import Toolbar from "./components/Toolbar/Toolbar";
import Routes from "./Routes";

import './App.css';

class App extends Component {
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user} logout={this.props.logout} />
                </header>
                <Container style={{marginTop: '20px'}}>
                   <Routes user={this.props.user}/>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));