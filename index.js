const nodemailer = require("nodemailer");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./schema");
const { createStore } = require("./dataSource");
const { createMongo } = require("./mongoSource");
const resolvers = require("./resolver");
const PetAPI = require("./petAPI");
require("dotenv").config();

async function startApolloServer() {
  const store = createStore();
  const mongoStore = createMongo();
  const app = express();
  const project_routes = require("./project");

  var transporter = nodemailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    tls: {
      secure: true,
      rejectUnauthorized: false,
      secureProtocol: "TLSv1_method",
    }, // true for 465, false for other ports
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    }
  });

  const server = new ApolloServer({
    subscriptions: {
      path: "/subscriptions",
      onConnect: (connectionParams, webSocket, context) => {
        console.log("Client connected");
      },
      onDisconnect: (webSocket, context) => {
        console.log("Client disconnected");
      },
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
      petAPI: new PetAPI({ store, mongoStore, undefined }),
    }),
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );

    next();
  });

  app.use("/api", project_routes);

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:4000${server.subscriptionsPath}`
  );
  return { server, app, httpServer };
}

startApolloServer();
