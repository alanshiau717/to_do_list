import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {TestResolver} from "./resolvers/TestResolver"
import { UserResolver } from "./resolvers/UserResolver";
import auth from "./middleware/authentication";
import { UserSessionResolver } from "./resolvers/UserSessionResolver";
import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { FolderResolver } from "./resolvers/FolderResolver";
import { ListResolver } from "./resolvers/ListResolver";
import { TaskResolver } from "./resolvers/TaskResolver";
// import http from 'http';
// const express = require("express")
// import express from "express"
// import expressJwt from "express-jwt"
// appendFile.use(
//   expressJwt()
// )



export default async function main() {
  createConnection()
  const schema = await buildSchema({
    resolvers : [TestResolver, UserResolver, UserSessionResolver, FolderResolver, ListResolver, TaskResolver],
  })
  const corsOptions = {
    origin: ['http://localhost:3000', "http://localhost", "https://studio.apollographql.com"],
    credentials: true
  }
  const app = express();
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(auth)
  app.listen()
  const server = new ApolloServer({
    schema,
    context: ({req, res}: any) => {
      
      const context = {
        req,
        res,
        userId: req.userId,
        sessionId: req.sessionId

      }
      return context
    }
  })

  await server.start()
  server.applyMiddleware({app, cors: corsOptions, path: '/'})


  // const server = new ApolloServer({ schema, context: auth, cors: {
  //   origin: ['http://localhost:3000', "http://localhost", "https://studio.apollographql.com"],
  //   credentials: true
  // }})

  return app.listen({port: 4000}, () => 
    console.log("Server is ready"))
  
}

// main()