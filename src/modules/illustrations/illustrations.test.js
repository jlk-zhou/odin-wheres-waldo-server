import illustrations from "./illustrations.routes.js";

import request from "supertest";
import express from "express";
import { pool, prisma } from "../../lib/prisma.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/illustrations", illustrations);

describe("GET /illustrations", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/illustrations")
      .expect("Content-Type", /json/)
      .expect(200, done)
      .expect([
        {
          id: "1",
          name: "Doodle",
          artistId: "1",
          widthPx: 1000,
          heightPx: 3000,
          resourceUrl: "example.com",
        },
      ]);
  });
});
