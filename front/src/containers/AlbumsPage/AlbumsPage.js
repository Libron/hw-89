import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {deleteAlbum, fetchAlbums, publishAlbum} from "../../store/actions/albumsActions";
import {Badge, ListGroup, ListGroupItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import ArtistThumbnail from "../../components/ArtistThumbnail/ArtistThumbnail";

import './AlbumsPage.css';
import {getCookie, setCookie} from "../../cookies";

class AlbumsPage extends Component {
    componentDidMount(){
        this.props.fetchAlbums(this.props.location.search);
    };

    render() {
        if (!this.props.albums) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h2>Albums <span className="labelArtist">{getCookie('artist')}</span></h2>
                <ListGroup className="Artists">
                    {this.props.albums.map(album => (
                        <ListGroupItem className="Item" key={album._id} onClick={() => setCookie('album', album.title)}>
                            <NavLink className="Link" tag={RouterNavLink} to={`/tracks?album_id=${album._id}`} exact>
                                <ArtistThumbnail image={album.image} />
                                <span className="Album">{album.title} / </span>
                                <span className="Year">{album.year}</span>

                                <span style={{float: 'right'}}>
                                     {album.published ? null : <Badge color='danger' className="cs-badge" onClick={() => this.props.publishAlbum(album._id)}>Publish now</Badge>}

                                    {this.props.user && ((this.props.user.role === 'admin') || (this.props.user._id === album.user._id)) &&  <Badge color="warning" className="cs-badge" onClick={() => this.props.deleteAlbum(album._id)}>Delete</Badge>}
                                    <Badge color="light" className="cs-badge">{album.user.username}</Badge>
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
    albums: state.albums.albums,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: (query) => dispatch(fetchAlbums(query)),
    publishAlbum: albumId => dispatch(publishAlbum(albumId)),
    deleteAlbum: albumId => dispatch(deleteAlbum(albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);