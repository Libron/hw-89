import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../Form/FormElement";

class ArtistForm extends Component {
    state = {
        name: '',
        bio: '',
        image: null
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.submit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors &&
            this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="name"
                    title="Name"
                    type="text"
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('name')}
                    placeholder="Enter artist name"
                    autoComplete="new-name"
                />

                <FormElement
                    propertyName="bio"
                    title="Biography"
                    type="textarea"
                    value={this.state.bio}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('bio')}
                    placeholder="Enter artist biography"
                    autoComplete="new-bio"
                />

                <FormGroup row>
                    <Label sm={2} for="image">Artist Photo</Label>
                    <Col sm={10}>
                        <Input
                            type="file"
                            name="image" id="image"
                            onChange={this.fileChangeHandler}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Add artist</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default ArtistForm;
