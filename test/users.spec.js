const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
require("dotenv").config();
const token = process.env.TEST_TOKEN;
chai.should();
chai.use(chaiHttp);
const userId = "607015bd91c5c45c7cebeac3";
const invalidUserId = "6070159991c5c45c7cebeac9";

describe("Users API", () => {
  //Test GET /users
  describe("GET /users", () => {
    it("It should GET all the users with pagination", (done) => {
      chai
        .request(server)
        .get("/users?page=1&perPage=3")
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });
  });

  //TEST GET /users/:id
  describe("GET /users", () => {
    it("should get user by id api with status 200", (done) => {
      chai
        .request(server)
        .get("/users/" + userId)
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /users/:id", () => {
    it("should throw 404 while fetching user tasks with Invalid id", (done) => {
      chai
        .request(server)
        .get("/users/" + invalidUserId)
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
