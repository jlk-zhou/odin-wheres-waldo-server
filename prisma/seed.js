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
        "https://res.cloudinary.com/deohvijjz/image/upload/c_crop,g_south,w_1200,h_700,q_40/v1781776364/map_fl1qsu.jpg",
    },
  });

  const artistEgor = await prisma.artist.findFirst({
    where: {
      name: "Egor Klyuchnyk",
    },
  });

  const spaceCon = await prisma.illustration.create({
    data: {
      name: "Space-Con",
      characters: {
        create: [
          {
            name: "Goku",
            xStartPx: 650,
            xEndPx: 750,
            yStartPx: 2050,
            yEndPx: 2150,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107594/Goku_htiqrx.png",
          },
          {
            name: "Yubaba",
            xStartPx: 100,
            xEndPx: 215,
            yStartPx: 905,
            yEndPx: 1020,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107594/Yubaba_vplrmk.png",
          },
          {
            name: "Bathound",
            xStartPx: 625,
            xEndPx: 725,
            yStartPx: 1555,
            yEndPx: 1655,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Bathound_mpo6a8.png",
          },
          {
            name: "Simp-wizard",
            xStartPx: 520,
            xEndPx: 620,
            yStartPx: 2600,
            yEndPx: 2700,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107594/Simp-wizard_j2al7o.png",
          },
          {
            name: "Bugs Bunny",
            xStartPx: 135,
            xEndPx: 235,
            yStartPx: 3280,
            yEndPx: 3380,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Bugs_Bunny_olgsrg.png",
          },
          {
            name: "Bubblehead",
            xStartPx: 710,
            xEndPx: 810,
            yStartPx: 580,
            yEndPx: 680,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Bubblehead_rcaqtq.png",
          },
          {
            name: "Cursed Canine",
            xStartPx: 630,
            xEndPx: 710,
            yStartPx: 2985,
            yEndPx: 3065,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Cursed_Canine_joeeob.png",
          },
          {
            name: "Frank",
            xStartPx: 380,
            xEndPx: 460,
            yStartPx: 1630,
            yEndPx: 1710,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107594/Frank_tqgn45.png",
          },
          {
            name: "Daffy Duck",
            xStartPx: 290,
            xEndPx: 370,
            yStartPx: 2160,
            yEndPx: 2240,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Daffy_Duck_zfzrnu.png",
          },
          {
            name: "Fat Boss",
            xStartPx: 855,
            xEndPx: 935,
            yStartPx: 1167,
            yEndPx: 1247,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107593/Fat_Boss_ecogfo.png",
          },
        ],
      },
      artist: {
        connect: {
          id: artistEgor.id,
        },
      },
      widthPx: 1045,
      heightPx: 3558,
      resourceUrl:
        "https://res.cloudinary.com/deohvijjz/image/upload/v1784107596/map_qw2dlu.jpg",
      thumbnail:
        "https://res.cloudinary.com/deohvijjz/image/upload/c_crop,w_1100,h_600,q_40/v1784107596/map_qw2dlu.jpg",
    },
  });

  const universe11 = await prisma.illustration.create({
    data: {
      name: "Universe-11",
      characters: {
        create: [
          {
            name: "LMO Fish",
            xStartPx: 330,
            xEndPx: 410,
            yStartPx: 350,
            yEndPx: 430,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107625/LMO_Fish_otjm0s.png",
          },
          {
            name: "Rabies Virus",
            xStartPx: 40,
            xEndPx: 120,
            yStartPx: 1420,
            yEndPx: 1500,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107625/Rabies_Virus_egde2n.png",
          },
          {
            name: "Minion",
            xStartPx: 155,
            xEndPx: 215,
            yStartPx: 1662,
            yEndPx: 1722,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107627/Minion_hizbsb.png",
          },
          {
            name: "Hog Rider",
            xStartPx: 370,
            xEndPx: 440,
            yStartPx: 1540,
            yEndPx: 1610,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107623/Hog_Rider_fcngmc.png",
          },
          {
            name: "Jokat",
            xStartPx: 370,
            xEndPx: 440,
            yStartPx: 2020,
            yEndPx: 2090,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107624/Jokat_avlizi.png",
          },
          {
            name: "Aura Farmer",
            xStartPx: 35,
            xEndPx: 105,
            yStartPx: 955,
            yEndPx: 1025,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107622/Aura_Farmer_lixkou.png",
          },
          {
            name: "Umami",
            xStartPx: 660,
            xEndPx: 730,
            yStartPx: 1510,
            yEndPx: 1580,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107627/Umami_amavvg.png",
          },
          {
            name: "Blob",
            xStartPx: 450,
            xEndPx: 550,
            yStartPx: 913,
            yEndPx: 1013,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107623/Blob_bnp7jh.png",
          },
          {
            name: "Stomachead",
            xStartPx: 325,
            xEndPx: 385,
            yStartPx: 1200,
            yEndPx: 1260,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107626/Stomachead_kxkv0q.png",
          },
          {
            name: "Lil Cadavre",
            xStartPx: 195,
            xEndPx: 255,
            yStartPx: 1965,
            yEndPx: 2025,
            imageUrl:
              "https://res.cloudinary.com/deohvijjz/image/upload/v1784107624/Lil_Cadavre_d9kzkn.png",
          },
        ],
      },
      artist: {
        connect: {
          id: artistEgor.id,
        },
      },
      widthPx: 820,
      heightPx: 2710,
      resourceUrl:
        "https://res.cloudinary.com/deohvijjz/image/upload/v1784107629/universe-11_jmyxhb.jpg",
      thumbnail:
        "https://res.cloudinary.com/deohvijjz/image/upload/c_crop,w_1100,h_600,q_40/v1784107629/universe-11_jmyxhb.jpg",
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
