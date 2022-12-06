import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'crypto'


const users = [
    {
        id: "54677544naeem34256",
        firstName: 'hassan',
        lastName: "habib",
        email: "hassan@gmail.com",
        password: '123hassan456'
    },
    {
        id: "4335sami345",
        firstName: 'ali',
        lastName: "saad",
        email: "saad@gmail.com",
        password: 'sami345'
    }
]


const Todos = [
    {
        title: 'buy book',
        by: 'naeem'
    },
    {
        title: 'write code',
        by: 'hassan'
    },
    {
        title: 'record video',
        by: '4335sami345'
    }
]


// The GraphQL schema
const typeDefs = gql`
type Query{
    getUsers:[User]
    user(id:ID!):User
  }
type Todo{
    title:String
    by:String

}

  type User {
   id:String!
  firstName:String!
  lastName:String!
  email:String!
  password:String!
  todos:[Todo]
  }
  input RegisterInput {
  firstName:String!
  lastName:String!
  email:String!
  password:String!
  }

  type Mutation {
    createUser(registerInput: RegisterInput): User!
   
  }
`;
// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        getUsers: () => users,
        user: (parent, args, context) => {
            // console.log('getUsers', context)
            const { id } = args;
            return users.find(item => item.id === id)
        }
    },
    // get the parent values in the mutaion;
    User: {
        todos: (parent) => {
            return Todos.filter((item) => item.by === parent.id)
        }
    },
    Mutation: {
        createUser: (_, { registerInput }) => {
            const newUser = {
                id: randomUUID,
                ...registerInput
            }
            users.push(newUser);
            return newUser;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        userLogin: true
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
