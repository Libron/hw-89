import React, {Component} from 'react';
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistsActions";
import {connect} from "react-redux";

class NewArtist extends Component {
    render() {
        return (
            <div>
                <h1>Add new artist</h1>
                <ArtistForm submit={this.props.createArtist}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createArtist: (artistData) => dispatch(createArtist(artistData))
});

export default connect(null, mapDispatchToProps)(NewArtist);