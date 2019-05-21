import React, {Component, Fragment} from 'react';
import {Badge, ListGroup, ListGroupItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {deleteArtist, fetchArtists, publishArtist} from "../../store/actions/artistsActions";
import ArtistThumbnail from "../../components/ArtistThumbnail/ArtistThumbnail";
import {NavLink as RouterNavLink} from "react-router-dom";

import './ArtistsPage.css';
import {setCookie} from "../../cookies";

class ArtistsPage extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    };

    render() {
        if (!this.props.artists) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h2>All Artists <i>({this.props.artists.length})</i></h2>
                <ListGroup className="Artists">
                    {this.props.artists.map(artist => (
                        <ListGroupItem className="Item" key={artist._id} onClick={() => setCookie('artist', artist.name)}>
                            <NavLink className="Link" tag={RouterNavLink} to={`/albums?artist_id=${artist._id}`} exact>
                            <ArtistThumbnail image={artist.image} />
                            <span>{artist.name}</span>
                                <span style={{float: 'right'}}>
                                     {(!artist.published && (this.props.user !== null) && (this.props.user.role === 'admin')) ? <Badge color='danger' className="cs-badge" onClick={() => this.props.publishArtist(artist._id)}>Publish now</Badge> : null}
                                    {this.props.user && ((this.props.user.role === 'admin') || (this.props.user._id === artist.user._id)) && <Badge color="warning" className="cs-badge" onClick={() => this.props.deleteArtist(artist._id)}>Delete</Badge>}
                                    <Badge color="light" className="cs-badge">{artist.user.username}</Badge>
                                </span>
                            </NavLink>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
    publishArtist: (artistId) => dispatch(publishArtist(artistId)),
    deleteArtist: artistId => dispatch(deleteArtist(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsPage);