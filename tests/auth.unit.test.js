const authController = require("../controllers/user.controller");
const connection = require("../database/connection");
const { User, EmailVerification } = require("../database/models");

require("dotenv").config();

connection.connect(process.env.DB_TEST_URL);

describe("Authentication testing", () => {
  const regPayload = {
    email: "olaniyiojeyinka@gmail.com",
    name: "john doe",
    mobileNumber: "2347086825",
    country: "Nigeria",
    password: "mypassword",
  };

  it("New User can register", async () => {
    const response = await authController.register(regPayload);

    expect(response).toHaveProperty("name");
  });

  it("unverified user cannot sign in", async () => {
    await expect(authController.login(regPayload)).rejects.toThrow(
      "Please verify you email before you login"
    );
  });

  it("can retrieve all users", async () => {
    const users = await authController.getAllUsers();

    expect(users.length).toBeGreaterThan(0);
  });

  it("can resend verication code", async () => {
    
    const users = await authController.getAllUsers();

    //get the first user and request new verification token
    const previousToken   = users[0].verification.token

    const response = await authController.resendVerification(previousToken);


    const user  =  await User.findOne({
      _id : users[0]._id
    }).populate("verification");

    //if latest doesn't equal new then resend successful

    console.log("check here",
    {previousToken,newToken: user.verification.token})


    expect(previousToken == user.verification.token).toBeFalsy();

  });


  it("can actually verify email with valid token", async () => {
    
    const users = await authController.getAllUsers();

    //get the first user and verify
  
   const response=  await authController.verifyEmail( users[0].verification.token);

    expect( response.emailVerified).toBe(true);

  });

});

connection.dropDatabase(process.env.DB_TEST_URL)