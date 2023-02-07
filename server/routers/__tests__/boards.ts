import request from "supertest";
import { app } from "./../../app";

describe("/boards", () => {
  describe("GET /boards", () => {
    it("respond with json containing a list of a boards for a user", async () => {
      await request(app)
        .get("/boards?userId=1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /boards/:boardId", () => {
    it("respond with board found by id", async () => {
      await request(app)
        .get("/boards/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("respond with 404 for invalid Id", async () => {
      await request(app)
        .get("/boards/a")
        .set("Accept", "application/json")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(404);
    });
  });

  describe("POST /boards", () => {
    const verifyBoardValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "name",
              msg: "Invalid value",
            }),
          ]),
        })
      );
    };
    it("respond with 200 when member created successfully", async () => {
      const newBoard = {
        name: "new name",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };
      await request(app)
        .post("/boards")
        .set("Accept", "application/json")
        .send(newBoard)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200);
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/boards")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyBoardValidation);
    });
  });

  describe("PUT /boards/:boardId", () => {
    const verifyBoardUpdateValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "name",
              msg: "Invalid value",
            }),
          ]),
        })
      );
    };

    it("respond with 200 when member updated successfully", async () => {
      const updatedBoard = {
        name: "updated name",
        last_modified: new Date().toISOString(),
      };
      await request(app)
        .put("/boards/1")
        .set("Accept", "text/html; charset=utf-8")
        .send(updatedBoard)
        .expect("Content-Type", "text/plain; charset=utf-8")
        .expect(200);
    });

    it("respond with 400 for missing data", async () => {
      await request(app)
        .put("/boards/1")
        .set("Accept", "application/json; charset=utf-8")
        .send({})
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(400)
        .expect(verifyBoardUpdateValidation);
    });
  });

  describe("DELETE /boards/:boardId", () => {
    it("respond with 200 when board is deleted", async () => {
      await request(app).delete("/boards/1").expect(204);
    });
  });
});
