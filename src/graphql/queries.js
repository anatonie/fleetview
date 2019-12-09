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
