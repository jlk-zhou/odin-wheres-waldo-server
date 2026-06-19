import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function seedMaps() {
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
    },
  });
}

seedMaps()
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
