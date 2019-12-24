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
export const getEvent = `query GetEvent($id: ID!, $date: AWSDateTime!) {
  getEvent(id: $id, date: $date) {
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
export const listEvents = `query ListEvents(
  $id: ID
  $date: ModelStringKeyConditionInput
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEvents(
    id: $id
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      date
      title
      description
      location
      orgOnly
      creator
    }
    nextToken
  }
}
`;
export const getEventSubscriber = `query GetEventSubscriber($eventId: ID!, $user: String!) {
  getEventSubscriber(eventId: $eventId, user: $user) {
    eventId
    user
  }
}
`;
export const listEventSubscribers = `query ListEventSubscribers(
  $eventId: ID
  $user: ModelStringKeyConditionInput
  $filter: ModelEventSubscriberFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEventSubscribers(
    eventId: $eventId
    user: $user
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      eventId
      user
    }
    nextToken
  }
}
`;
