import * as chai from "chai";
import * as server from "../app";
import * as mocha from "mocha";

const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

describe("Login and Logout", () => {
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