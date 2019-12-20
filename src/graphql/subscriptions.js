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
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
    id
    title
    description
    date
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
    id
    user
    eventId
    notify
  }
}
`;
export const onUpdateEventSubscriber = `subscription OnUpdateEventSubscriber($user: String) {
  onUpdateEventSubscriber(user: $user) {
    id
    user
    eventId
    notify
  }
}
`;
export const onDeleteEventSubscriber = `subscription OnDeleteEventSubscriber($user: String) {
  onDeleteEventSubscriber(user: $user) {
    id
    user
    eventId
    notify
  }
}
`;
