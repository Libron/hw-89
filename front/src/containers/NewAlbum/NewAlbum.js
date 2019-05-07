import React, {Component} from 'react';
import {fetchArtists} from "../../store/actions/artistsActions";
import {connect} from "react-redux";
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumsActions";

class NewAlbum extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    };

    render() {
        return (
            <div>
                <h1>New Album</h1>
                <AlbumForm artists={this.props.artists} submit={this.props.createAlbum} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists

});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
    createAlbum: albumData => dispatch(createAlbum(albumData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);