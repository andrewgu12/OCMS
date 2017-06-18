"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const server = require("../app");
const User = require("../models/User");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
describe("User Tests", () => {
    describe("Register and delete user", () => {
        it("should create a new user", (done) => {
            chai.request(server)
                .post("/register")
                .send({ username: "user1", password: "pass" })
                .end((err, res) => {
                res.should.have.status(200);
                User.findOne({ username: "user1" }, (err, user) => {
                    user.username.should.equal("user1");
                    done();
                });
            });
        });
        it("should delete selected user", (done) => {
            chai.request(server)
                .post("/delete")
                .send({ username: "user1" })
                .end((err, res) => {
                res.should.have.status(200);
                User.findOne({ username: "user1" }, (err, user) => {
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
                .send({ username: "user2", password: "pass" })
                .end((err, res) => {
                res.should.have.status(200);
                User.findOne({ username: "user2" }, (err, user) => {
                    user.username.should.equal("user2");
                });
            });
        });
        it("should fail login", (done) => {
            chai.request(server)
                .post("/login")
                .send({ username: "test", password: "pass" })
                .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
        it("should successfully login", (done) => {
            chai.request(server)
                .post("/login")
                .send({ username: "user2", password: "pass" })
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        after(() => {
            chai.request(server)
                .post("/delete")
                .send({ username: "user2" })
                .end((err, res) => {
                res.should.have.status(200);
            });
        });
    });
});
