import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function main() {
  // First illustration
  const roboTown = await prisma.illustration.create({
    data: {
      name: "RoboTown",
      characters: {
        create: [
          {
            name: "Kamaji Pro",
            xStartPx: 1210,
            yStartPx: 2090,
            xEndPx: 1360,
            yEndPx: 2240,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kamaji-pro_opbwyv.png",
          },
          {
            name: "Bathing Ape",
            xStartPx: 1200,
            yStartPx: 5490,
            xEndPx: 1330,
            yEndPx: 5620,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/bathing-ape_y7rsj3.png",
          },
          {
            name: "Botchan",
            xStartPx: 1645,
            yStartPx: 5885,
            xEndPx: 1700,
            yEndPx: 6010,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/botchan_tobmwu.png",
          },
          {
            name: "Waldo",
            xStartPx: 1600,
            yStartPx: 6720,
            xEndPx: 1680,
            yEndPx: 6800,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/waldo_zxvoln.png",
          },
          {
            name: "Kumamon",
            xStartPx: 1200,
            yStartPx: 7340,
            xEndPx: 1310,
            yEndPx: 7450,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kumamon_evq4om.png",
          },
          {
            name: "Kenny",
            xStartPx: 1150,
            yStartPx: 6080,
            xEndPx: 1230,
            yEndPx: 6160,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/kenny_d2xccu.png",
          },
          {
            name: "Aang",
            xStartPx: 90,
            yStartPx: 6080,
            xEndPx: 170,
            yEndPx: 6160,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/aang_eyo65g.png",
          },
          {
            name: "Kaonashi",
            xStartPx: 1175,
            yStartPx: 2620,
            xEndPx: 1255,
            yEndPx: 2700,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kaonashi_gdnjnw.png",
          },
          {
            name: "Tom",
            xStartPx: 1675,
            yStartPx: 7695,
            xEndPx: 1775,
            yEndPx: 7795,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/tom_b7n9tw.png",
          },
          {
            name: "Turnip Head",
            xStartPx: 855,
            yStartPx: 3930,
            xEndPx: 955,
            yEndPx: 4030,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776363/turnip-head_v65vmh.png",
          },
        ],
      },
      artist: {
        create: {
          name: "Egor Klyuchnyk",
          website: "https://chekavo.artstation.com/",
        },
      },
      widthPx: 2000,
      heightPx: 8000,
      resourceUrl:
        "https://res.cloudinary.com/deohvijjz/image/upload/v1781776364/map_fl1qsu.jpg",
      thumbnail: 
        "https://res.cloudinary.com/deohvijjz/image/upload/c_crop,g_south,w_1200,h_700,q_40/v1781776364/map_fl1qsu.jpg"
    },
  });

  // Records
  const record1 = await prisma.record.create({
    data: {
      durationMs: 74918,
      player: {
        create: {
          name: "Lonely Lion",
        },
      },
    },
  });

  const record2 = await prisma.record.create({
    data: {
      durationMs: 83629,
      player: {
        create: {
          name: "Classy Chipmunk",
        },
      },
    },
  });

  const record3 = await prisma.record.create({
    data: {
      durationMs: 66530,
      player: {
        create: {
          name: "Optimistic Opossum",
        },
      },
    },
  });

  const record4 = await prisma.record.create({
    data: {
      durationMs: 53920,
      player: {
        create: {
          name: "Dainty Dingo",
        },
      },
    },
  });

  const record5 = await prisma.record.create({
    data: {
      durationMs: 67932,
      player: {
        create: {
          name: "Calm Capybara",
        },
      },
    },
  });

  const record6 = await prisma.record.create({
    data: {
      durationMs: 30298,
      player: {
        create: {
          name: "Skillful Squirrel",
        },
      },
    },
  });

  const record7 = await prisma.record.create({
    data: {
      durationMs: 50398,
      player: {
        create: {
          name: "Wimpy Wolf",
        },
      },
    },
  });

  const record8 = await prisma.record.create({
    data: {
      durationMs: 68293,
      player: {
        create: {
          name: "Kind Kitten",
        },
      },
    },
  });

  const record9 = await prisma.record.create({
    data: {
      durationMs: 78301,
      player: {
        create: {
          name: "Wholesome Whale",
        },
      },
    },
  });

  const record10 = await prisma.record.create({
    data: {
      durationMs: 72619,
      player: {
        create: {
          name: "Dominant Dolphin",
        },
      },
    },
  });

  const record11 = await prisma.record.create({
    data: {
      durationMs: 40392,
      player: {
        create: {
          name: "Muscular Mouse",
        },
      },
    },
  });

  const record12 = await prisma.record.create({
    data: {
      durationMs: 54928,
      player: {
        create: {
          name: "Giant Giraffe",
        },
      },
    },
  });

  const record13 = await prisma.record.create({
    data: {
      durationMs: 28739,
      player: {
        create: {
          name: "Awesome Aardvark",
        },
      },
    },
  });

  const record14 = await prisma.record.create({
    data: {
      durationMs: 56489,
      player: {
        create: {
          name: "Puffy Penguin",
        },
      },
    },
  });

  const record15 = await prisma.record.create({
    data: {
      durationMs: 79287,
      player: {
        create: {
          name: "Sad Seal",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
