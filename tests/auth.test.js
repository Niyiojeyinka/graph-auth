const request = require("supertest");
const expect = require("chai").expect;
const { generateLoginToken } = require("./helper");
const app = require("../app");

before((done) => {
  setTimeout(() => {
    done();
  }, 1000);
});

const userDetails = {
  name: "Olaniyi ojeyinka",
  email: "olaniyiojeyinka@gmail.com",
  password: "test1234",
};

describe("/api/auth/user/register USER registration", () => {
  it("New User can register", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(userDetails);
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
