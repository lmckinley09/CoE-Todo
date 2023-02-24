import request from "supertest";
import { app } from "./../../app";

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of a users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:userId", () => {
    it("respond with user found by id", async () => {
      await request(app)
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/users/a")
        .set("Accept", "application/json")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(404);
    });
  });

  describe("POST /users", () => {
    const verifyUserValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "firstName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "firstName",
              msg: "first name should have min length of 2",
            }),
            expect.objectContaining({
              location: "body",
              param: "lastName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "lastName",
              msg: "last name should have min length of 2",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "your password should have min and max length between 8-15",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "your password should have at least one number",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "your password should have at least one special character",
            }),
          ]),
        })
      );
    };
    it("respond with 200 when user created successfully", async () => {
      const newUser = {
        email: "email@unosquare.com",
        password: "password1!",
        first_name: "fname",
        last_name: "lname",
        profile_picture: "profile.png",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send(newUser)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyUserValidation);
    });
  });

  describe("PUT /users/:userId", () => {
    const verifyUserUpdateValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "firstName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "firstName",
              msg: "first name should have min length of 2",
            }),
            expect.objectContaining({
              location: "body",
              param: "lastName",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "lastName",
              msg: "last name should have min length of 2",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when user updated successfully", async () => {
      const updatedUser = {
        email: "email1@unosquare.com",
        password: "password1!",
        first_name: "first",
        last_name: "last",
      };
      await request(app)
        .put("/users/1")
        .set("Accept", "text/html; charset=utf-8")
        .send(updatedUser)
        .expect("Content-Type", "text/plain; charset=utf-8")
        .expect(200);
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/users/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(400)
        .expect(verifyUserUpdateValidation);
    });
  });

  describe("DELETE /users/:userId", () => {
    it("respond with 200 when users deleted", async () => {
      await request(app).delete("/users/1").expect(204);
    });
  });
});
