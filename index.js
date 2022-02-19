const express = require("express");
const path = require("path");
const useCor = require("./middlewares/cors.middleware");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/type-defs");
const resolvers = require("./schema/resolvers");
const connection = require("./database/connection");
const models = require("./database/models/index");
const apiRoutes = require("./routes")
require("dotenv").config();


connection.connect(process.env.DB_URL);

const app = express();



const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
  context: { models },
});

const startApolloServer  = async ()=>{
  
  await server.start();
  server.applyMiddleware({ app });


}

startApolloServer()


app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
 app.use("/api", useCor,apiRoutes );

 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
