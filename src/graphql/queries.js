/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShip = `query GetShip($id: ID!) {
  getShip(id: $id) {
    id
    type
    name
    owner
  }
}
`;
export const listShips = `query ListShips(
  $filter: ModelShipFilterInput
  $limit: Int
  $nextToken: String
) {
  listShips(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      name
      owner
    }
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      date
      location
      orgOnly
      creator
    }
    nextToken
  }
}
`;
export const getEventSubscriber = `query GetEventSubscriber($id: ID!) {
  getEventSubscriber(id: $id) {
    id
    user
    eventId
    notify
  }
}
`;
export const listEventSubscribers = `query ListEventSubscribers(
  $filter: ModelEventSubscriberFilterInput
  $limit: Int
  $nextToken: String
) {
  listEventSubscribers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user
      eventId
      notify
    }
    nextToken
  }
}
`;
