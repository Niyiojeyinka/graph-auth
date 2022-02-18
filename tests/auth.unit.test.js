const expect = require("chai").expect;
const authController = require("../controllers/user.controller");




describe("Registration test", () => {
  const regPayload = { email: "olaniyiojeyinka@gmail.com", name: "john doe", mobileNumber: "2347086825", country: "Nigeria" }
  it("New User can register", async () => {

    expect(response.status).to.be.equal(201);
  });
});

describe("/api/auth/login USER authentication ", () => {
  it("User can sign in", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(userDetails);
    expect(response.status).to.be.equal(200);
  });

  it("Wrong User Details can't  sign in", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: userDetails.email,
      password: "wrongtest1234",
    });

    expect(response.status).to.be.equal(401);
  });
});
