import React, {Component} from 'react';
import {connect} from "react-redux";
import TrackForm from "../../components/TrackForm/TrackForm";
import {fetchAlbums} from "../../store/actions/albumsActions";
import {createTrack} from "../../store/actions/tracksAction";

class NewTrack extends Component {
    componentDidMount() {
        this.props.fetchAlbums();
    };

    render() {
        return (
            <div>
                <h1>New Track</h1>
                <TrackForm albums={this.props.albums} submit={this.props.createTrack} />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: () => dispatch(fetchAlbums()),
    createTrack: albumData => dispatch(createTrack(albumData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);