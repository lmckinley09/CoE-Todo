import request from "supertest";
import { app } from "./../../app";

describe("/authenticate", () => {
  describe("POST /authenticate", () => {
    const verifyAuthValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              param: "email",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              param: "password",
              msg: "Invalid value",
            }),
          ]),
        })
      );
    };
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/authenticate")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyAuthValidation);
    });

    it("respond with 200 when user successfully authenticated", async () => {
      const member = {
        email: "admin@email.com",
        password: "password1!",
      };
      await request(app)
        .post("/authenticate")
        .set("Accept", "application/json")
        .send(member)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /authenticate/refresh", () => {
    it("respond with json containing an access and refresh token", async () => {
      await request(app)
        .get("/authenticate/refresh")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
