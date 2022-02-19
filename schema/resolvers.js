const authController = require("../controllers/user.controller");


const resolvers = {
    Query: {

      async user(root, { _id }) {
 
        return await authController.getSingleUser(_id);
      },
      async users(root, args, { models }) {

        return await  authController.getAllUsers()
      }
    
    },
  };
  
module.exports = resolvers;
  