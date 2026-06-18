import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // First illustration
  const roboTown = await prisma.illustration.create({
    data: {
      name: "RoboTown",
      characters: {
        create: [
          {
            name: "Kamaji Pro",
            x_start_px: 1210,
            y_start_px: 2090,
            x_end_px: 1360,
            y_end_px: 2240,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kamaji-pro_opbwyv.png",
          },
          {
            name: "Bathing Ape",
            x_start_px: 1200,
            y_start_px: 5490,
            x_end_px: 1330,
            y_end_px: 5620,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/bathing-ape_y7rsj3.png",
          },
          {
            name: "Botchan",
            x_start_px: 1645,
            y_start_px: 5885,
            x_end_px: 1700,
            y_end_px: 6010,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/botchan_tobmwu.png",
          },
          {
            name: "Waldo",
            x_start_px: 1600,
            y_start_px: 6720,
            x_end_px: 1680,
            y_end_px: 6800,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/waldo_zxvoln.png",
          },
          {
            name: "Kumamon",
            x_start_px: 1200,
            y_start_px: 7340,
            x_end_px: 1310,
            y_end_px: 7450,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kumamon_evq4om.png",
          },
          {
            name: "Kenny",
            x_start_px: 1150,
            y_start_px: 6080,
            x_end_px: 1230,
            y_end_px: 6160,
            image_url:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/kenny_d2xccu.png",
          },
          {
            name: "Aang", 
            x_start_px: 90, 
            y_start_px: 6080, 
            x_end_px: 170, 
            y_end_px: 6160, 
            image_url: "https://res.cloudinary.com/deohvijjz/image/upload/v1781776361/aang_eyo65g.png", 
          }, 
          {
            name: "Kaonashi", 
            x_start_px: 1175, 
            y_start_px: 2620, 
            x_end_px: 1255, 
            y_end_px: 2700, 
            image_url: "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/kaonashi_gdnjnw.png", 
          }, 
          {
            name: "Tom", 
            x_start_px: 1675, 
            y_start_px: 7695, 
            x_end_px: 1775, 
            y_end_px: 7795, 
            image_url: "https://res.cloudinary.com/deohvijjz/image/upload/v1781776362/tom_b7n9tw.png", 
          }, 
          {
            name: "Turnip Head", 
            x_start_px: 855, 
            y_start_px: 3930, 
            x_end_px: 955, 
            y_end_px: 4030, 
            image_url: "https://res.cloudinary.com/deohvijjz/image/upload/v1781776363/turnip-head_v65vmh.png"
          }
        ],
      },
      artists: {
        create: [
          {
            name: "Egor Klyuchnyk",
            website: "https://chekavo.artstation.com/",
          },
        ],
      },
      width_px: 2000,
      height_px: 8000,
      resource_url:
        "https://res.cloudinary.com/deohvijjz/image/upload/v1781776364/map_fl1qsu.jpg",
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
