import matchers from "jest-extended"; 
import { prisma } from "../lib/prisma";
import { pool } from "../lib/prisma"; 

expect.extend(matchers); 

beforeEach((done) => {
  done(); 
}); 

afterEach(async () => {
  await prisma.$disconnect(); 
  await pool.end(); 
})