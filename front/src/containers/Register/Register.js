import React, {Component, Fragment} from 'react';
import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/Form/FormElement";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        avatarImage: null
    };

    inputChangeHandler = event => {
        this.setState({
           [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
      event.preventDefault();

      const formData = new FormData();

      Object.keys(this.state).forEach(key => {
          formData.append(key, this.state[key]);
      });

      this.props.registerUser(formData);
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                <h2>Register New User</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        {this.props.error.global}
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormGroup>
                        <FacebookLogin />
                    </FormGroup>

                    <FormElement
                        propertyName="displayName"
                        title="Display Name"
                        type="text"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayName')}
                        placeholder="Enter your desired display name"
                        autoComplete="new-displayName"
                    />

                   <FormElement
                       propertyName="username"
                       title="Username"
                       type="text"
                       value={this.state.username}
                       onChange={this.inputChangeHandler}
                       error={this.getFieldError('username')}
                       placeholder="Enter your desired username"
                       autoComplete="new-username"
                   />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter new secure password"
                        autoComplete="new-password"
                    />

                    <FormGroup row>
                        <Label sm={2} for="avatarImage">Avatar Image</Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="avatarImage" id="avatarImage"
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">Register</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
  error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);