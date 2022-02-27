import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import {TestResolver} from "./resolvers/TestResolver"
import { UserResolver } from "./resolvers/UserResolver";
import auth from "./middleware/authentication";
// const express = require("express")
// import express from "express"
// import expressJwt from "express-jwt"
// appendFile.use(
//   expressJwt()
// )
async function main() {
  createConnection()
  const schema = await buildSchema({
    resolvers : [TestResolver, UserResolver],
  
  })
  const server = new ApolloServer({ schema, context: auth})
  await server.listen(4000)
  console.log("Server has started!")
}
main()