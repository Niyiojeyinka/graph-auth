const authController = require("../controllers/user.controller");

const resolvers = {
  Query: {
    async user(root, { _id }) {
      return await authController.getSingleUser(_id);
    },
    async users(root, args, { models }) {
      return await authController.getAllUsers();
    },
  },

  Mutation: {
    async registerUser(root, payload) {
      try {
         
        return await authController.register(payload)

      } catch (error) {
        throw new Error(error.message);
      }
    },

    async login(root, payload) {
      try {
         
        return await authController.login(payload)
        
      } catch (error) {
        throw new Error(error.message);
      }
    }
,
    async resendVerificationEmail(root, payload) {
      try {
         
         await authController.resendVerificationEmail(payload.token)


         return {message:"Resend Successfuly ,please check you mailbox"}
        
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async verifyEmail(root, payload) {
      try {
         
         const user = await authController.verifyEmail(payload.token)


         return {message:"Email Verified ,you can now login"}
        
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
};

module.exports = resolvers;
