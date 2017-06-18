import * as chai from "chai";
import * as server from "../app";
import * as User from "../models/User";
import { IUser } from "../types/IUser";
import * as mocha from "mocha";

const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("User Tests", () => {
  describe("Register and delete user", () => {
    it("should create a new user", (done: Function) => {
      chai.request(server)
        .post("/register")
        .send({ username: "user1", password: "pass" })
        .end((err: any, res: Response) => {
          res.should.have.status(200);
          User.findOne({ username: "user1" }, (err: any, user: IUser) => {
            user.username.should.equal("user1");
            done();
          });
        });
    });
    it("should delete selected user", (done: Function) => {
      chai.request(server)
        .post("/delete")
        .send({ username: "user1" })
        .end((err: any, res: Response) => {
          res.should.have.status(200);
          User.findOne({ username: "user1" }, (err: any, user: IUser) => {
            should.not.exist(user);
            done();
          });
        });
    });
  });
  describe("Login", () => {
    // Create an user to login
    before(() => {
      chai.request(server)
        .post("/register")
        .send({ username: "user1", password: "pass" })
        .end((err: any, res: Response) => {
          res.should.have.status(200);
          User.findOne({ username: "user1" }, (err: any, user: IUser) => {
            user.username.should.equal("user1");
          });
        });
    });
    it("should fail login", (done: Function) => {
      chai.request(server)
        .post("/login")
        .send({ username: "test", password: "pass" })
        .end((err: any, res: Response) => {
          res.should.have.status(401);
          done();
        });
    });
    it("should successfully login", (done: Function) => {
      chai.request(server)
      .post("/login")
      .send({username: "user1", password: "pass"})
      .end((err: any, res: Response) => {
        res.should.have.status(200);
        done();
      });
    });
    after(() => {
      chai.request(server)
      .post("/delete")
      .send({username: "user1"})
      .end((err: any, res: Response) => {
        res.should.have.status(200);
      });
    });
  });
});