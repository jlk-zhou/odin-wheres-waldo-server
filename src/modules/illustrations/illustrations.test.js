import app from "../../tests/testApp.js";
import { it, jest } from "@jest/globals";
import request from "supertest";

import _ from "lodash";

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

  it("returns an error for trying to select characters from a non-existent map", (done) => {
    request(app)
      .get("/illustrations/fakeid/characters")
      .expect({ error: "Cannot find illustration with id 'fakeid'" })
      .expect(404, done);
  });

  it("returns an error for providing an invalid query", (done) => {
    request(app)
      .get("/illustrations/1/characters?n=-67")
      .expect({ error: "Please enter a positive integer for query 'n'." })
      .expect(400, done);

    request(app)
      .get("/illustrations/2/characters?n=cat")
      .expect({ error: "Please enter a positive integer for query 'n'." })
      .expect(400, done);
  });

  it("returns an error for trying to select more characters than there are in a map", (done) => {
    request(app)
      .get("/illustrations/3/characters")
      .query({ n: 100 })
      .expect({ error: "Please select fewer than all characters in the map." })
      .expect(400, done);
  });
});

describe("GET /illustrations/{id}/characters/{id}?x={1000}&y={1000}", () => {
  it("returns true if character can be found in given coordinate within the map", (done) => {
    request(app)
      .get("/illustrations/1/characters/4")
      .query({ x: 370, y: 2630 })
      .expect("Content-Type", /json/)
      .expect({ found: true })
      .expect(200, done);
  });

  it("returns false if character cannot be found in given coordinate", async () => {
    const xMissYMiss = await request(app)
      .get("/illustrations/1/characters/1")
      .query({ x: 398, y: 936 })
      .expect("Content-Type", /json/)
      .expect({ found: false })
      .expect(200);

    const xHitYMiss = await request(app)
      .get("/illustrations/2/characters/8")
      .query({ x: 639, y: 3857 })
      .expect("Content-Type", /json/)
      .expect({ found: false })
      .expect(200);

    const xMissYHit = await request(app)
      .get("/illustrations/3/characters/15")
      .query({ x: 1267, y: 6153 })
      .expect("Content-Type", /json/)
      .expect({ found: false })
      .expect(200);
  });

  it("returns an error for not being able to find character or illustration", async () => {
    const cantFindBoth = await request(app)
      .get("/illustrations/boo/characters/ucantfindme")
      .query({ x: 203, y: 404 })
      .expect("Content-Type", /json/)
      .expect(404);
    expect(cantFindBoth.body.error).toMatch(
      /(cannot|can't|find|illustration|map|)/i,
    );

    const cantFindCharacter = await request(app)
      .get("/illustrations/2/characters/ucantfindme")
      .query({ x: 203, y: 404 })
      .expect("Content-Type", /json/)
      .expect(404);
    expect(cantFindCharacter.body.error).toMatch(
      /(cannot|can't|find|illustration|map|character)/i,
    );

    const cantFindIllustration = await request(app)
      .get("/illustrations/boo/characters/7")
      .query({ x: 203, y: 404 })
      .expect("Content-Type", /json/)
      .expect(404);
    expect(cantFindIllustration.body.error).toMatch(
      /(cannot|can't|find|illustration|map)/i,
    );
  });

  it("returns an error for missing any coordinate", async () => {
    const response = await request(app)
      .get("/illustrations/2/characters/9")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toMatch(/(x|y|coordinates)/);
  });

  it("returns an error for invalid x and y coordinates", async () => {
    const response = await request(app)
      .get("/illustrations/3/characters/11")
      .query({ x: "lueluelue", y: "-100" })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toMatch(/(x|y|positive|integers)/);
  });

  it("returns an error for coordinates that are out of the map's bound", async () => {
    const response = await request(app)
      .get("/illustrations/1/characters/2")
      .query({ x: 100000, y: 200000 })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toMatch(/(coordinates|within|outof|bound)/);
  });
});

describe("GET /illustrations/{id}/artist", () => {
  it("retrieves the artist of a given illustration", (done) => {
    request(app)
      .get("/illustrations/1/artist")
      .expect({
        id: "1",
        name: "Banksy",
        website: "banksy.com",
      })
      .expect(200, done);
  });

  it("returns an error for trying to select artist from a non-existent illustration", (done) => {
    request(app)
      .get("/illustrations/fakeid/artist")
      .expect({ error: "Cannot find illustration with id 'fakeid'" })
      .expect(404, done);
  });
});
