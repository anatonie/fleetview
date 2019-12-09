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
