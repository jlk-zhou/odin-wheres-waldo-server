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
