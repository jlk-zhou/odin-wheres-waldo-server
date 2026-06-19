import matchers from "jest-extended";
import { prisma } from "../lib/prisma";
import { pool } from "../lib/prisma";
import { seedMaps } from "../../prisma/seed";

expect.extend(matchers);

// Reset database to a designated state
beforeEach(async () => {
  // Delete everything in the database
  await prisma.$transaction([
    prisma.artist.deleteMany(),
    prisma.record.deleteMany(),
  ]);

  // Populate database with maps, use dev seed
  // await seedMaps();
  await prisma.illustration.create({
    data: {
      id: "1", 
      name: "Doodle",
      artist: {
        create: {
          id: "1", 
          name: "Silly B",
          website: "mypage.com",
        },
      },
      widthPx: 1000,
      heightPx: 3000,
      resourceUrl: "example.com",
    },
  });

  // Populate database with records
  await prisma.$transaction([
    prisma.record.create({
      data: {
        durationMs: 74329,
        player: {
          create: {
            name: "psycho goldfish",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 63910,
        player: {
          create: {
            name: "wild flower frog",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 88271,
        player: {
          create: {
            name: "garlic panda bread",
          },
        },
      },
    }),
  ]);
});

// Disconnect prisma from database before shutting db down
afterEach(async () => {
  await prisma.$disconnect();
  await pool.end();
});
