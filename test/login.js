"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const server = require("../app");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
describe("Login and Logout", () => {
    describe("Login", () => {
        it("should fail login", (done) => {
            chai.request(server)
                .post("/login")
                .send({ username: "test", password: "pass" })
                .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });
});
