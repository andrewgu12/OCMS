import * as chai from "chai";
import * as server from "../app";
import * as User from "../models/User";
import { IUser } from "../types/IUser";
import * as mocha from "mocha";

const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("Login and Logout", () => {
  describe("Register and delete user", () => {
    it("should create a new user", (done) => {
      chai.request(server)
          .post("/register")
          .send({username: "user1", password: "pass"})
          .end((err: any, res: Response) => {
            // console.log(res);
            res.should.have.status(200);
            User.find({username: "user1"}, (err: any, user: IUser) => {
              user.username.should.equal("user1");
            });
            done();
          });
    });
  });
  describe("Login", () => {
    it("should fail login", (done) => {
      chai.request(server)
          .post("/login")
          .send({username: "test", password: "pass"})
          .end((err: any, res: Response) => {
            res.should.have.status(401);
            done();
          });
    });
  });
});