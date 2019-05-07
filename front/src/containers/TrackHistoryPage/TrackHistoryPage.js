import React, {Component, Fragment} from 'react';
import {Badge, ListGroup, ListGroupItem} from "reactstrap";
import {fetchHistory} from "../../store/actions/tracksAction";
import {connect} from "react-redux";

class TrackHistoryPage extends Component {
    componentDidMount() {
        let token = '';
        if (this.props.user) {
            token = this.props.user.token;
        }
        this.props.fetchHistory(token);
    };

    render() {
        if (!this.props.history) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <h2>Track History ({this.props.history.length})</h2>
                <ListGroup className="History">
                    {this.props.history.map(history => (
                        <ListGroupItem className="Item" key={history._id}>
                            <Badge style={{marginRight: '20px'}} color="info" pill>{history.user.username}</Badge>
                            <span className="Track">{history.track.title}</span>
                            <span className="Duration">{history.datetime}</span>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    history: state.tracks.history,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchHistory: (token) => dispatch(fetchHistory(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistoryPage);