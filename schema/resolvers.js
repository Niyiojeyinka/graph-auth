const models = require("../database/models/index");


const resolvers = {
    Query: {

      async user(root, { _id }) {
 
        return await models.User.findOne({_id:_id}).populate("verification");
      },
      async users(root, args, { models }) {

        return await models.User.find({}).populate("verification");
      }
    //   async recipe(root, { id }, { models }) {
    //     return models.Recipe.findById(id);
    //   },
    },
  };
  
module.exports = resolvers;
  