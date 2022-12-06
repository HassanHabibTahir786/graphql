import { gql } from 'apollo-server';
// The GraphQL schema
export const typeDefs = gql`
type Query{
    users:[User]
    user(id:ID!):User
  }
  type User {
   id:String!
  firstName:String!
  lastName:String!
  email:String!
  }
  input RegisterInput {
  firstName:String!
  lastName:String!
  email:String!
  password:String!
  }
  type Mutation {
   
  }
`;

