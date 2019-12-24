/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShip = `subscription OnCreateShip {
  onCreateShip {
    id
    type
    name
    owner
  }
}
`;
export const onUpdateShip = `subscription OnUpdateShip {
  onUpdateShip {
    id
    type
    name
    owner
  }
}
`;
export const onDeleteShip = `subscription OnDeleteShip {
  onDeleteShip {
    id
    type
    name
    owner
  }
}
`;
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
    id
    date
    title
    description
    location
    orgOnly
    creator
    subscribers {
      nextToken
    }
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    date
    title
    description
    location
    orgOnly
    creator
    subscribers {
      nextToken
    }
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
    id
    date
    title
    description
    location
    orgOnly
    creator
    subscribers {
      nextToken
    }
  }
}
`;
export const onCreateEventSubscriber = `subscription OnCreateEventSubscriber {
  onCreateEventSubscriber {
    eventId
    user
  }
}
`;
export const onUpdateEventSubscriber = `subscription OnUpdateEventSubscriber {
  onUpdateEventSubscriber {
    eventId
    user
  }
}
`;
export const onDeleteEventSubscriber = `subscription OnDeleteEventSubscriber {
  onDeleteEventSubscriber {
    eventId
    user
  }
}
`;
