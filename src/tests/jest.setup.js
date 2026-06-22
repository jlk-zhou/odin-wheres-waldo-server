import matchers from "jest-extended";
import { prisma } from "../lib/prisma";
import { pool } from "../lib/prisma";

expect.extend(matchers);

// Reset database to a designated state
beforeEach(async () => {
  await prisma.$transaction([
    // Delete everything in the database
    prisma.artist.deleteMany(),
    prisma.record.deleteMany(),
    prisma.player.deleteMany(), 

    // Populate database with maps
    prisma.illustration.create({
      data: {
        id: "1",
        name: "Doodle",
        artist: {
          create: {
            id: "1",
            name: "Banksy",
            website: "banksy.com",
          },
        },
        characters: {
          create: [
            {
              id: "1",
              name: "Totoro",
              xStartPx: 150,
              xEndPx: 250,
              yStartPx: 1450,
              yEndPx: 1550,
              imageUrl: "totoro.png",
            },
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
              id: "3",
              name: "Waldo",
              xStartPx: 650,
              xEndPx: 750,
              yStartPx: 1040,
              yEndPx: 1140,
              imageUrl: "waldo.png",
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
          ],
        },
        widthPx: 1000,
        heightPx: 3000,
        resourceUrl: "doodle.com",
      },
    }),
    prisma.illustration.create({
      data: {
        id: "2",
        name: "Graffiti",
        artist: {
          connect: { id: "1" },
        },
        characters: {
          create: [
            {
              id: "6",
              name: "Forrest Gump",
              xStartPx: 1700,
              xEndPx: 1800,
              yStartPx: 3480,
              yEndPx: 3580,
              imageUrl: "forrest_gump.png",
            },
            {
              id: "7",
              name: "Claudia",
              xStartPx: 100,
              xEndPx: 200,
              yStartPx: 2310,
              yEndPx: 2320,
              imageUrl: "claudia.png",
            },
            {
              id: "8",
              name: "Alyosha",
              xStartPx: 600,
              xEndPx: 700,
              yStartPx: 4400,
              yEndPx: 4500,
              imageUrl: "alyosha.png",
            },
            {
              id: "9",
              name: "Faust",
              xStartPx: 1100,
              xEndPx: 1200,
              yStartPx: 3850,
              yEndPx: 3950,
              imageUrl: "faust.png",
            },
            {
              id: "10",
              name: "Spongebob Squarepants",
              xStartPx: 660,
              xEndPx: 760,
              yStartPx: 2910,
              yEndPx: 3010,
              imageUrl: "spongebob.png",
            },
          ],
        },
        widthPx: 2000,
        heightPx: 5000,
        resourceUrl: "graffiti.com",
      },
    }),
    prisma.illustration.create({
      data: {
        id: "3",
        name: "Mural",
        artist: {
          connect: { id: "1" },
        },
        characters: {
          create: [
            {
              id: "11",
              name: "Wukong",
              xStartPx: 260,
              xEndPx: 270,
              yStartPx: 1130,
              yEndPx: 1230,
              imageUrl: "wukong.png",
            },
            {
              id: "12",
              name: "Ziggy",
              xStartPx: 340,
              xEndPx: 440,
              yStartPx: 4920,
              yEndPx: 5020,
              imageUrl: "ziggy.png",
            },
            {
              id: "13",
              name: "Pink Panther",
              xStartPx: 620,
              xEndPx: 720,
              yStartPx: 2290,
              yEndPx: 2390,
              imageUrl: "pink_panther.png",
            },
            {
              id: "14",
              name: "Ashe",
              xStartPx: 1240,
              xEndPx: 1340,
              yStartPx: 5370,
              yEndPx: 5470,
              imageUrl: "ashe.png",
            },
            {
              id: "15",
              name: "Chihiro",
              xStartPx: 770,
              xEndPx: 870,
              yStartPx: 6100,
              yEndPx: 6200,
              imageUrl: "chihiro.png",
            },
          ],
        },
        widthPx: 1500,
        heightPx: 6500,
        resourceUrl: "mural.com",
      },
    }),

    // Records
    prisma.record.create({
      data: {
        durationMs: 74918,
        player: {
          create: {
            name: "Lonely Lion",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 83629,
        player: {
          create: {
            name: "Classy Chipmunk",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 66530,
        player: {
          create: {
            name: "Optimistic Opossum",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 53920,
        player: {
          create: {
            name: "Dainty Dingo",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 67932,
        player: {
          create: {
            name: "Calm Capybara",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 30298,
        player: {
          create: {
            name: "Skillful Squirrel",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 50398,
        player: {
          create: {
            name: "Wimpy Wolf",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 68293,
        player: {
          create: {
            name: "Kind Kitten",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 78301,
        player: {
          create: {
            name: "Wholesome Whale",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 72619,
        player: {
          create: {
            name: "Dominant Dolphin",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 40392,
        player: {
          create: {
            name: "Muscular Mouse",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 54928,
        player: {
          create: {
            name: "Giant Giraffe",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 28739,
        player: {
          create: {
            name: "Awesome Aardvark",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 56489,
        player: {
          create: {
            name: "Puffy Penguin",
          },
        },
      },
    }),
    prisma.record.create({
      data: {
        durationMs: 79287,
        player: {
          create: {
            name: "Sad Seal",
          },
        },
      },
    }),
  ]);
});

// Disconnect prisma from database before shutting db down
afterAll(async () => {
  await prisma.$disconnect();
  await pool.end();
});
