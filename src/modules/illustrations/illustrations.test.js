import illustrations from "./illustrations.routes.js";

import request from "supertest";
import express from "express";
import { pool, prisma } from "../../lib/prisma.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/illustrations", illustrations);

describe("GET /illustrations", () => {
  // beforeEach((done) => {
  //   done();
  // });

  // afterEach(async () => {
  //   await prisma.$disconnect(); 
  //   await pool.end(); 
  // }); 

  it("responds with json", (done) => {
    request(app)
      .get("/illustrations")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
