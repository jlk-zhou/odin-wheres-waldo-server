import app from "../../tests/testApp.js";
import { it } from "@jest/globals";
import request from "supertest";
import isSortedAscend from "./util/isSortedAscend.js";

describe("GET /records", () => {
  it("retrieves all records in database", async () => {
    const response = await request(app)
      .get("/records")
      .expect("Content-Type", /json/)
      .expect(200);

    // Expect all 15 records to be returned
    expect(response.body.length).toEqual(15);

    // Expect each record to match a certain shape with certain fields
    response.body.forEach((record) => {
      expect(record).toMatchObject({
        id: expect.any(String),
        durationMs: expect.toBeInteger(),
        player: {
          id: expect.any(String),
          name: expect.any(String),
        },
      });
    });
  });

  it("sorts all records in ascending order if specified", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: true })
      .expect("Content-Type", /json/)
      .expect(200);

    const durations = response.body.map((record) => record.durationMs);
    expect(isSortedAscend(durations)).toBe(true);
  });

  it("lists the top few records if specified", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: true })
      .query({ n: 5 })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.length).toEqual(5);

    const durations = response.body.map((record) => record.durationMs);
    expect(isSortedAscend(durations)).toBe(true);
  });

  it("returns an error for anything other than 'true' passed to query 'sortAscend'", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: "cat" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("returns an error for some invalid string 'n' query", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: true })
      .query({ n: "foo" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/(positive|integer)/);
  });

  it("returns an error for some invalid negative 'n' query", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: true })
      .query({ n: -5 })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/(positive|integer)/);
  });

  it("returns an error for querying more records than there are", async () => {
    const response = await request(app)
      .get("/records")
      .query({ sortAscend: true })
      .query({ n: 100 })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/(more|fewer|than)/);
  });

  it("returns an error for using only query 'n' without query 'sortAscend'", async () => {
    const response = await request(app)
      .get("/records")
      .query({ n: 5 })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/(sortAscend|n)/);
  });
});

describe("POST /records", () => {
  it("allows user to create a new record in database", async () => {
    // Check if server returns the new record upon its creation
    const createRecord = await request(app)
      .post("/records")
      .set("Accept", "application/json")
      .send({ name: "John", durationMs: 73294 })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(createRecord.body).toMatchObject({
      id: expect.any(String),
      playerId: expect.any(String),
      durationMs: expect.toBeInteger(),
    });

    // Check if the record is indeed added to the db
    const getAllRecords = await request(app)
      .get("/records")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(getAllRecords.body.length).toEqual(16);
  });

  it("returns an error for not providing either player name or time", async () => {
    const createRecord = await request(app)
      .post("/records")
      .set("Accept", "application/json")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(createRecord.body.error).toMatch(/(name|durationMs|required)/);
  });

  it("returns an error for providing invalid time", async () => {
    const createRecord = await request(app)
      .post("/records")
      .set("Accept", "application/json")
      .send({ name: "Goofy", durationMs: "Mickey Mouse" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(createRecord.body.error).toMatch(/(name|invalid|valid)/);
  });
});
