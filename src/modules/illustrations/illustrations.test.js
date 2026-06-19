import illustrations from "./illustrations.routes.js";

import request from "supertest";
import express from "express";
import { pool, prisma } from "../../lib/prisma.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/illustrations", illustrations);

describe("GET /illustrations", () => {
  it("retrieves a list of all illustrations in database", (done) => {
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
          resourceUrl: "doodle.com",
        },
        {
          id: "2",
          name: "Graffiti",
          artistId: "1",
          widthPx: 2000,
          heightPx: 5000,
          resourceUrl: "graffiti.com",
        },
        {
          id: "3",
          name: "Mural",
          artistId: "1",
          widthPx: 1500,
          heightPx: 6500,
          resourceUrl: "mural.com",
        },
      ]);
  });
});
