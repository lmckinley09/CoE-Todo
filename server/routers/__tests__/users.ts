import request from "supertest";
import app from "./../../app";
import { prismaAsAny } from "./../../testUtil/prisma";

jest.mock("@prisma/client");

const req = request(app);

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of a users", async () => {
      prismaAsAny.app_user = {
        findMany: jest.fn().mockReturnValueOnce({}),
      };
      await req
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:userId", () => {
    it("respond with user found by id", async () => {
      prismaAsAny.app_user = {
        findUnique: jest.fn().mockReturnValueOnce({}),
      };
      await req
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  //   describe("POST /users", () => {
  //     const verifyMemberValidation = (res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           error: expect.arrayContaining([
  //             expect.objectContaining({
  //               param: "username",
  //               msg: "the name must have minimum length of 3",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have min and max length between 8-15",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have at least one number",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have at least one special character",
  //             }),
  //             expect.objectContaining({
  //               param: "first_name",
  //               msg: "the first name must have minimum length of 3",
  //             }),
  //             expect.objectContaining({
  //               param: "last_name",
  //               msg: "the last name must have minimum length of 3",
  //             }),
  //           ]),
  //         })
  //       );
  //     };
  //     it("respond with 400 for missing data", async () => {
  //       await request(app)
  //         .post("/users")
  //         .set("Accept", "application/json")
  //         .send({})
  //         .expect("Content-Type", /json/)
  //         .expect(400)
  //         .expect(verifyMemberValidation);
  //     });

  //     it("respond with 201 when users created successfully", async () => {
  //       const newMember = {
  //         email: "email@email.com",
  //         password: "password1!",
  //         first_name: "fname",
  //         last_name: "lname",
  //       };
  //       await request(app)
  //         .post("/users")
  //         .set("Accept", "application/json")
  //         .send(newMember)
  //         .expect("Content-Type", /text/)
  //         .expect(201);
  //     });
  //   });

  //   describe("PUT /users/:userId", () => {
  //     const verifyMemberUpdateValidation = (res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining({
  //           error: expect.arrayContaining([
  //             expect.objectContaining({
  //               param: "username",
  //               msg: "the name must have minimum length of 3",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have min and max length between 8-15",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have at least one number",
  //             }),
  //             expect.objectContaining({
  //               param: "password",
  //               msg: "your password should have at least one special character",
  //             }),
  //             expect.objectContaining({
  //               param: "first_name",
  //               msg: "the first name must have minimum length of 3",
  //             }),
  //             expect.objectContaining({
  //               param: "last_name",
  //               msg: "the last name must have minimum length of 3",
  //             }),
  //           ]),
  //         })
  //       );
  //     };
  //     it("respond with 400 for missing data", async () => {
  //       await request(app)
  //         .put("/users/1")
  //         .set("Accept", "application/json")
  //         .send({})
  //         .expect("Content-Type", /json/)
  //         .expect(400)
  //         .expect(verifyMemberUpdateValidation);
  //     });

  //     it("respond with 200 when users updated successfully", async () => {
  //       const updatedMember = {
  //         username: "emer@test.com",
  //         password: "password2!",
  //         first_name: "emer",
  //         last_name: "rocks",
  //         users_teams: [],
  //       };
  //       await request(app)
  //         .put("/users/1")
  //         .set("Accept", "application/json")
  //         .send(updatedMember)
  //         .expect("Content-Type", /json/)
  //         .expect(200);
  //     });
  //   });

  describe("DELETE /users/:userId", () => {
    it("respond with 200 when users deleted", async () => {
      await req
        .delete("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
