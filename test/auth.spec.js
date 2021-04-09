const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
require("dotenv").config();
const token = process.env.AUTH_TOKEN;
const ObjectID = require("mongodb").ObjectID;
const User = require("../models/user");
chai.should();
chai.use(chaiHttp);

const invalidUserId = ObjectID("60703e6552b7f54c08f5b153");

describe("Auth API", () => {
  //Test GET /users
  describe("POST /", () => {
    it("It should save a new user in DB with 200 if not exits", (done) => {
      chai
        .request(server)
        .post("/")
        .send({
          email: "surabhi.x.com",
          password: "677888999",
        })
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("Object");
          done();
        });
    });
  });

  
  describe("POST /", () => {
    it("It should just return token to the user if exits with 200 ", (done) => {
      chai
        .request(server)
        .post("/")
        .send({
          email: "surabhi.x.com",
          password: "677888999",
        })
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("Object");
          done();
        });
    });
  });

  //TEST GET /users/:id

  describe("DELETE /:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      let user = new User({
        email: "dummy.x.com",
        password: "dummy",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/" + user._id)
          .set({ token: token })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe("DELETE /:id", () => {
    it("should throw 404 when invalid userid is passed", (done) => {
      chai
        .request(server)
        .delete("/" + invalidUserId)
        .set({ token: token })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
