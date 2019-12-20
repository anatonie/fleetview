import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import NewEvent from '../components/newEvent';
import * as OrgFleet from '../utilities/orgFleet';

function Events(props) {
    const {
        events = [],
        admin = false
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
                        <div>Description: {event.description}</div>
                        <div>Location: {event.location}</div>
                        <div>Date: {new Date(parseInt(event.date, 10)).toString()}</div>
                        <div>Org Only: {event.orgOnly ? 'true' : 'false'}</div>
                        {admin && <div onClick={() => setEvent(event) & setUpdateModal(true)}>Update</div>}
                    </div>
                ))}
            </div>
            {updateModal && <NewEvent
                event={event}
                close={() => setUpdateModal(false)}
                save={(savedEvent) => {
                    event.id ? OrgFleet.updateEvent(savedEvent) : OrgFleet.createEvent(savedEvent);
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
    eventCount: (state.events ? state.events : []).length
}))(Events);
