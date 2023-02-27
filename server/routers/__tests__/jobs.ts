import request from "supertest";
import { app } from "./../../app";

describe("/jobs", () => {
  describe("GET /jobs", () => {
    it("respond with json containing a list of a jobs for a board", async () => {
      await request(app)
        .get("/jobs?boardId=1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});

describe("POST /jobs", () => {
  const verifyJobValidation = (res) => {
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.arrayContaining([
          expect.objectContaining({
            location: "body",
            param: "title",
            msg: "Invalid value",
          }),
          expect.objectContaining({
            location: "body",
            param: "title",
            msg: "job title should have minimum length of 3",
          }),
          expect.objectContaining({
            location: "body",
            param: "description",
            msg: "Invalid value",
          }),
          expect.objectContaining({
            location: "body",
            param: "description",
            msg: "description should have minimum length of 3",
          }),
          expect.objectContaining({
            location: "body",
            param: "completionDate",
            msg: "Invalid value",
          }),
        ]),
      })
    );
  };
  it("respond with 200 when job created successfully", async () => {
    const newJob = {
      type_id: 1,
      title: "new name",
      description: "desc",
      completionDate: new Date().toISOString(),
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    };
    await request(app)
      .post("/jobs?boardId=1")
      .set("Accept", "application/json")
      .send(newJob)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });

  it("respond with 400 for missing data", async () => {
    await request(app)
      .post("/jobs?boardId=1")
      .set("Accept", "application/json")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(verifyJobValidation);
  });
});

describe("PUT /jobs/:jobId", () => {
  const verifyJobUpdateValidation = (res) => {
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.arrayContaining([
          expect.objectContaining({
            location: "body",
            param: "title",
            msg: "Invalid value",
          }),
          expect.objectContaining({
            location: "body",
            param: "title",
            msg: "job title should have minimum length of 3",
          }),
          expect.objectContaining({
            location: "body",
            param: "description",
            msg: "Invalid value",
          }),
          expect.objectContaining({
            location: "body",
            param: "description",
            msg: "description should have minimum length of 3",
          }),
          expect.objectContaining({
            location: "body",
            param: "completionDate",
            msg: "Invalid value",
          }),
        ]),
      })
    );
  };

  it("respond with 200 when job updated successfully", async () => {
    const updatedJob = {
      type_id: 2,
      title: "updated name",
      description: "desc",
      completionDate: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    };
    await request(app)
      .put("/jobs/1")
      .set("Accept", "text/html; charset=utf-8")
      .send(updatedJob)
      .expect("Content-Type", "text/plain; charset=utf-8")
      .expect(200);
  });

  it("respond with 400 for missing data", async () => {
    await request(app)
      .put("/jobs/1")
      .set("Accept", "application/json; charset=utf-8")
      .send({})
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400)
      .expect(verifyJobUpdateValidation);
  });
});

describe("DELETE /jobs/:jobId", () => {
  it("respond with 200 when job is deleted", async () => {
    await request(app).delete("/jobs/1").expect(204);
  });
});
