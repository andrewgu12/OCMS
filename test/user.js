"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var server = require("../app");
var User = require("../models/User");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
describe("User Tests", function () {
    describe("Register and delete user", function () {
        it("should create a new user", function (done) {
            chai.request(server)
                .post("/register")
                .send({ username: "user1", password: "pass" })
                .end(function (err, res) {
                res.should.have.status(200);
                User.findOne({ username: "user1" }, function (err, user) {
                    user.username.should.equal("user1");
                    done();
                });
            });
        });
        it("should delete selected user", function (done) {
            chai.request(server)
                .post("/delete")
                .send({ username: "user1" })
                .end(function (err, res) {
                res.should.have.status(200);
                User.findOne({ username: "user1" }, function (err, user) {
                    should.not.exist(user);
                    done();
                });
            });
        });
    });
    describe("Login", function () {
        // Create an user to login
        before(function () {
            chai.request(server)
                .post("/register")
                .send({ username: "user2", password: "pass" })
                .end(function (err, res) {
                res.should.have.status(200);
                User.findOne({ username: "user2" }, function (err, user) {
                    user.username.should.equal("user2");
                });
            });
        });
        it("should fail login", function (done) {
            chai.request(server)
                .post("/login")
                .send({ username: "test", password: "pass" })
                .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
        });
        it("should successfully login", function (done) {
            chai.request(server)
                .post("/login")
                .send({ username: "user2", password: "pass" })
                .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
        });
        after(function () {
            chai.request(server)
                .post("/delete")
                .send({ username: "user2" })
                .end(function (err, res) {
                res.should.have.status(200);
            });
        });
    });
});
