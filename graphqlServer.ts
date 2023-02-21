import { ApolloServer } from '@appolo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// we need tsx to read node for ts files

// typescript type here:
type Args = {
  id:string
}

const typeDefs = `#graphql

// shape of schema
type Animal {
  id:ID!
  firstName:String
  type:String
  accessory:String
}

type Query {
  animals:[Animal]
  animal(id:ID!): Animal;
}
`
// hardcoded database
const animals = [
{
  id: 1,
firstName:'Ralph',
type: 'Tiger',
accessory: 'Gold'},
{
  id: 2,
firstName:'Otto',
type: 'Seal',
accessory: 'Silver'}
];

// what should happen when someon makes a query
const resolvers = {
  Query: {
    animals: () => {
      return animals;
    },
    animal: (parent:string, args:Args) => {
      return animals.find((animal)=> animal.id === parseInt(args.id))
    }

  }
}
// passing the schema and the resolvers so they can communicate with one another
const server = new ApolloServer({
  typeDefs,resolvers,
})

// function to start server
async function startApolloServer(){
const {url} = await startStandaloneServer(sever, {listen:{port:8000}})
console.log('server is running", url)
}

startApolloServer().catch((erro)=> {console.log(error)})
;
