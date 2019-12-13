/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShip = `subscription OnCreateShip($owner: String) {
  onCreateShip(owner: $owner) {
    id
    type
    name
    owner
  }
}
`;
export const onUpdateShip = `subscription OnUpdateShip($owner: String) {
  onUpdateShip(owner: $owner) {
    id
    type
    name
    owner
  }
}
`;
export const onDeleteShip = `subscription OnDeleteShip($owner: String) {
  onDeleteShip(owner: $owner) {
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
    title
    description
    date
    location
    private
    creator
    subscribers {
      nextToken
    }
  }
}
`;
export const onUpdateEvent = `subscription OnUpdateEvent($creator: String) {
  onUpdateEvent(creator: $creator) {
    id
    title
    description
    date
    location
    private
    creator
    subscribers {
      nextToken
    }
  }
}
`;
export const onDeleteEvent = `subscription OnDeleteEvent($creator: String) {
  onDeleteEvent(creator: $creator) {
    id
    title
    description
    date
    location
    private
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
