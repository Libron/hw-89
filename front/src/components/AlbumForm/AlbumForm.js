import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../Form/FormElement";

class AlbumForm extends Component {
    state = {
        title: '',
        year: '',
        artist: '',
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
                    propertyName="title"
                    title="Album title"
                    type="text"
                    value={this.state.title}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('title')}
                    placeholder="Enter album title"
                    autoComplete="new-title"
                />

                <FormElement
                    propertyName="year"
                    title="Year"
                    type="number"
                    value={this.state.year}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldError('year')}
                    placeholder="Enter year"
                    autoComplete="new-year"
                />

                <FormGroup row>
                    <Label sm={2} for="image">Album cover image</Label>
                    <Col sm={10}>
                        <Input
                            type="file"
                            name="image" id="image"
                            onChange={this.fileChangeHandler}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label sm={2} for="artist">Artist</Label>
                    <Col sm={10}>
                        <Input
                            type="select" required
                            name="artist" id="artist"
                            value={this.state.artist}
                            onChange={this.inputChangeHandler}
                        >
                            <option value="">Please select artist...</option>
                            {this.props.artists.map(artist => (
                                <option key={artist._id} value={artist._id}>{artist.name}</option>
                            ))}
                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">Add album</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default AlbumForm;