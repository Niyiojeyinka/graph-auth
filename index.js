const express = require("express");
const path = require("path");
const useCor = require("./middlewares/cors.middleware");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/type-defs");
const resolvers = require("./schema/resolvers");
const connection = require("./database/connection");
const models = require("./database/models/index");
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

//   const verifyData =  await models.EmailVerification.create({
//     verifiedAt: null,
//     token: "heytoekn",
//   });

// const newUser= await models.User.create(
//    {
//      name : "ola niyi",
//      email: "ola@gmail.com",
//      country: "Nigeria",
//      mobileNumber: "23490976543",
//      password: "test",
//    }
//  );

//  newUser.verification = verifyData;
//  newUser.save();


//  verification = await models.EmailVerification.findOne({
//   token : verifyData.token
// });

// user  =await models.User.findOne({
//   verification: verification
// })
//  console.log("verify data",verifyData);
//  console.log("search user", user);


}

startApolloServer()


app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
 app.use("/api/auth", useCor, async(req,res)=>{
  const authController = require("./controllers/user.controller");

  const regPayload = { email: "olaniyiojeyinka@gmail.com", 
  name: "john doe", mobileNumber: "2347086825",
   country: "Nigeria" , password: "mypassword" }

  const response = await authController.register(regPayload);

  return res.json({
    success:true,
    ...response
  })
 });

 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
