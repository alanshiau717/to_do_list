import "reflect-metadata";
// import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import {TestResolver} from "./resolvers/TestResolver"
import { UserResolver } from "./resolvers/UserResolver";
async function main() {
  const schema = await buildSchema({resolvers : [TestResolver, UserResolver]})
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}
main()