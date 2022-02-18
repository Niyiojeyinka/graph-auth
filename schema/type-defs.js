const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    mobileNumber: String!
    country: String!
    status: UserStatus
    verification: Verification
  }

  enum UserStatus {
    ACTIVE
    INACTIVE
  }

  type Verification {
    _id: ID!
    verifiedAt: String
  }

  type Query {
    user(_id: ID!): User
    users: [User!]!
  }
`;

module.exports = typeDefs;

// type Mutation {
//   createUser(name: String!, email: String!, password: String!,country:Country! ,mobileNumber:String!): User!

// }
