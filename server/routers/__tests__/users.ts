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
  });

  describe("DELETE /users/:userId", () => {
    it("respond with 200 when users deleted", async () => {
      await request(app).delete("/users/1").expect(204);
    });
  });
});
