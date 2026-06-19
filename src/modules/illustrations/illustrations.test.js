import illustrations from "./illustrations.routes.js";

import { it, jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import { pool, prisma } from "../../lib/prisma.js";

import _ from "lodash";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/illustrations", illustrations);

describe("GET /illustrations", () => {
  it("retrieves a list of all illustrations in database", (done) => {
    request(app)
      .get("/illustrations")
      .expect("Content-Type", /json/)
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
      ])
      .expect(200, done);
  });
});

describe("GET /illustrations/{id}/characters?n={3}", () => {
  it("retrieves all characters if not providing optional quantity query", (done) => {
    request(app)
      .get("/illustrations/2/characters")
      .expect("Content-Type", /json/)
      .expect([
        {
          id: "6",
          name: "Forrest Gump",
          illustrationId: "2",
          xStartPx: 1700,
          xEndPx: 1800,
          yStartPx: 3480,
          yEndPx: 3580,
          imageUrl: "forrest_gump.png",
        },
        {
          id: "7",
          name: "Claudia",
          illustrationId: "2",
          xStartPx: 100,
          xEndPx: 200,
          yStartPx: 2310,
          yEndPx: 2320,
          imageUrl: "claudia.png",
        },
        {
          id: "8",
          name: "Alyosha",
          illustrationId: "2",
          xStartPx: 600,
          xEndPx: 700,
          yStartPx: 4400,
          yEndPx: 4500,
          imageUrl: "alyosha.png",
        },
        {
          id: "9",
          name: "Faust",
          illustrationId: "2",
          xStartPx: 1100,
          xEndPx: 1200,
          yStartPx: 3850,
          yEndPx: 3950,
          imageUrl: "faust.png",
        },
        {
          id: "10",
          name: "Spongebob Squarepants",
          illustrationId: "2",
          xStartPx: 660,
          xEndPx: 760,
          yStartPx: 2910,
          yEndPx: 3010,
          imageUrl: "spongebob.png",
        },
      ])
      .expect(200, done);
  });

  it("retrieves n random characters if specified", async () => {
    const mockedCharacters = [
      {
        id: "2",
        name: "Pikachu",
        xStartPx: 430,
        xEndPx: 530,
        yStartPx: 2200,
        yEndPx: 2300,
        imageUrl: "pikachu.png",
      },
      {
        id: "4",
        name: "Morty",
        xStartPx: 330,
        xEndPx: 430,
        yStartPx: 2600,
        yEndPx: 2700,
        imageUrl: "morty.png",
      },
      {
        id: "5",
        name: "Jerry",
        xStartPx: 800,
        xEndPx: 900,
        yStartPx: 2100,
        yEndPx: 2200,
        imageUrl: "jerry.png",
      },
    ];
    const spy = jest.spyOn(_, "sampleSize").mockReturnValue(mockedCharacters);

    const response = await request(app)
      .get("/illustrations/1/characters")
      .query({ n: 3 })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual(mockedCharacters);

    jest.restoreAllMocks();
  });

  it("returns an error for trying to select more characters than there are in a map", (done) => {
    request(app)
      .get("/illustrations/3/characters")
      .query({n: 100})
      .expect({
        error: "Please select fewer than all characters available in this map."
      })
      .expect(400, done)
  });
});
