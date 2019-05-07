import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ArtistsPage from "./containers/ArtistsPage/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage/AlbumsPage";
import TracksPage from "./containers/TracksPage/TracksPage";
import TrackHistoryPage from "./containers/TrackHistoryPage/TrackHistoryPage";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";

const ProtectedRoute = ({isAllowed, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to="/login" />;
};

const Routes = ({user}) => {
  return (
    <Switch>
        <Route path="/" exact component={ArtistsPage}/>
        <Route path="/albums" exact component={AlbumsPage}/>
        <Route path="/tracks" exact component={TracksPage}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/track-history" exact component={TrackHistoryPage}/>

        <ProtectedRoute
            isAllowed={user && ((user.role === 'admin') || (user.role === 'user'))}
            path="/artists/new"
            exact
            component={NewArtist}
        />

        <ProtectedRoute
            isAllowed={user && ((user.role === 'admin') || (user.role === 'user'))}
            path="/albums/new"
            exact
            component={NewAlbum}
        />

        <ProtectedRoute
            isAllowed={user && ((user.role === 'admin') || (user.role === 'user'))}
            path="/tracks/new"
            exact
            component={NewTrack}
        />
     </Switch>
  );
};

export default Routes;
