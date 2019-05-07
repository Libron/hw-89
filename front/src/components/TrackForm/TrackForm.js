import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../Form/FormElement";

class TrackForm extends Component {
    state = {
        title: '',
        duration: '',
        album: '',
        number: ''
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.submit({...this.state});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors &&
            this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="number"
                    title="Track number"
                    type="number"
                    value={this.state.number}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('number')}
                    placeholder="Track number"
                    autoComplete="new-number"
                />

                <FormElement
                    propertyName="title"
                    title="Track name"
                    type="text"
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('title')}
                    placeholder="Track name"
                    autoComplete="new-title"
                />

                <FormElement
                    propertyName="duration"
                    title="Track duration"
                    type="text"
                    value={this.state.duration}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('duration')}
                    placeholder="03:24:00"
                    autoComplete="new-duration"
                />



                <FormGroup row>
                    <Label sm={2} for="album">Album:</Label>
                    <Col sm={10}>
                        <Input
                            type="select" required
                            name="album" id="album"
                            value={this.state.album}
                            onChange={this.inputChangeHandler}
                        >
                            <option value="">Please select album...</option>
                            {this.props.albums.map(album => (
                                <option key={album._id} value={album._id}>{album.title}</option>
                            ))}
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Add track</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default TrackForm;