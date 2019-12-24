import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import NewEvent from '../components/newEvent';
import * as OrgFleet from '../utilities/orgFleet';

function Events(props) {
    const {
        events = [],
        admin = false,
        authState,
        username
    } = props;
    const [updateModal, setUpdateModal] = useState(false);
    const [event, setEvent] = useState({});
    return (
        <div>
            <div style={{margin: '1rem'}}>
                {admin && <Button onClick={() => setUpdateModal(true)} style={{float: 'right'}}>Add new event</Button>}
            </div>
            <div>
                {events.map((event) => (
                    <div key={event.id}>
                        <div>Title: {event.title}</div>
                        <div>Creator: {event.creator}</div>
                        <div>Description: {event.description}</div>
                        <div>Location: {event.location}</div>
                        <div>Date: {new Date(event.date).toString()}</div>
                        <div>Attendees: {event.subs.length}</div>
                        <div>Org Only: {event.orgOnly ? 'true' : 'false'}</div>
                        {authState === 'signedIn' && event.subs.map(({user}) => user).indexOf(username) < 0 && <div onClick={() => OrgFleet.subscribeEvent(event.id, username)}>Subscribe</div>}
                        {authState === 'signedIn' && event.subs.map(({user}) => user).indexOf(username) >= 0 && <div onClick={() => OrgFleet.unSubscribeEvent(event.id, username)}>Unsubscribe</div>}
                        {admin && <div onClick={() => setEvent(event) & setUpdateModal(true)}>Update</div>}
                        {admin && <div onClick={() => OrgFleet.deleteEvent(event.id, event.date)}>Delete</div>}
                        <br/>
                    </div>
                ))}
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
