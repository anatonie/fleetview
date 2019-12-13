/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShip = `mutation CreateShip(
  $input: CreateShipInput!
  $condition: ModelShipConditionInput
) {
  createShip(input: $input, condition: $condition) {
    id
    type
    name
    owner
  }
}
`;
export const updateShip = `mutation UpdateShip(
  $input: UpdateShipInput!
  $condition: ModelShipConditionInput
) {
  updateShip(input: $input, condition: $condition) {
    id
    type
    name
    owner
  }
}
`;
export const deleteShip = `mutation DeleteShip(
  $input: DeleteShipInput!
  $condition: ModelShipConditionInput
) {
  deleteShip(input: $input, condition: $condition) {
    id
    type
    name
    owner
  }
}
`;
export const createEvent = `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
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
export const updateEvent = `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
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
export const createEventSubscriber = `mutation CreateEventSubscriber(
  $input: CreateEventSubscriberInput!
  $condition: ModelEventSubscriberConditionInput
) {
  createEventSubscriber(input: $input, condition: $condition) {
    id
    user
    eventId
    notify
  }
}
`;
export const updateEventSubscriber = `mutation UpdateEventSubscriber(
  $input: UpdateEventSubscriberInput!
  $condition: ModelEventSubscriberConditionInput
) {
  updateEventSubscriber(input: $input, condition: $condition) {
    id
    user
    eventId
    notify
  }
}
`;
export const deleteEventSubscriber = `mutation DeleteEventSubscriber(
  $input: DeleteEventSubscriberInput!
  $condition: ModelEventSubscriberConditionInput
) {
  deleteEventSubscriber(input: $input, condition: $condition) {
    id
    user
    eventId
    notify
  }
}
`;
