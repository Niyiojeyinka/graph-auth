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

  type AuthResponse {
    token: String!
    user: User!
  }

  type MessageResponse {
  message: String!
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

  type Mutation {
    registerUser(name: String!, email: String!, password: String!, country: String!, mobileNumber: String!): User!
    login (email: String!, password: String!): AuthResponse!
    resendVerificationEmail (token: String!): MessageResponse!
    verifyEmail (token: String!): MessageResponse!
  }
`;

module.exports = typeDefs;

 