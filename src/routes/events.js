import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import NewEvent from '../components/newEvent';
import * as OrgFleet from '../utilities/orgFleet';

function Events(props) {
    const {
        events = [],
        admin = false,
        op = false,
        authState,
        username
    } = props;
    const [updateModal, setUpdateModal] = useState(false);
    const [event, setEvent] = useState({});
    const infoStyles = {whiteSpace: 'nowrap'};
    const buttonStyles = {margin: '0.5rem'};
    return (
        <div style={{padding: '1rem'}}>
            <div style={{float: 'right'}}>
                {(admin || op) && <Button onClick={() => setUpdateModal(true)} style={{float: 'right'}}>Add new event</Button>}
                {username && <p style={{clear: 'both'}}><span className="text-primary">Blue</span> borders are org only events</p>}
            </div>
            <div>
                <div
                    style={{
                        marginTop: '3rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'justify',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}
                >
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            style={{
                                width: '25%',
                                minWidth: '16rem',
                                maxWidth: '20rem',
                                margin: '1rem'
                            }}
                            border={event.orgOnly ? 'primary' : undefined}
                        >
                            <Card.Body style={{display: 'flex', flexDirection: 'column'}}>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Text style={{flex: 1}}>{event.description}</Card.Text>
                                <Card.Text>
                                    <span style={infoStyles}>Where: {event.location}</span>
                                    <span style={infoStyles}>When: {new Date(event.date).toLocaleString()}</span>
                                    <span style={infoStyles}>Organizer: {event.creator}</span>
                                </Card.Text>
                                <Card.Footer style={{padding: 0}}>
                                    {authState === 'signedIn' && (
                                        event.subs.map(({user}) => user).indexOf(username) < 0 ? (
                                            <Button style={buttonStyles} variant="primary" onClick={() => OrgFleet.subscribeEvent(event.id, username)}>Subscribe</Button>
                                        ) : (
                                            <Button style={buttonStyles} variant="primary" onClick={() => OrgFleet.unSubscribeEvent(event.id, username)}>Unsubscribe</Button>
                                        ))}
                                        <div>
                                            {admin && <Button style={buttonStyles} onClick={() => setEvent(event) & setUpdateModal(true)}>Edit</Button>}
                                            {(admin || username === event.creator) && <Button style={buttonStyles} onClick={() => OrgFleet.deleteEvent(event.id, event.date)}>Delete</Button>}
                                        </div>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            {updateModal && <NewEvent
                event={event}
                close={() => setUpdateModal(false)}
                save={(savedEvent) => {
                    if (event.id) {
                        savedEvent.id = event.id;
                        OrgFleet.updateEvent(savedEvent)
                    } else {
                        OrgFleet.createEvent(savedEvent);
                    }
                    setUpdateModal(false);
                    setEvent({});
                }}
            />}
        </div>
    );
}

export default connect((state) => ({
    events: state.events,
    admin: state.admin,
    authState: state.authState,
    eventCount: (state.events ? state.events : []).length,
    username: state.username
}))(Events);
