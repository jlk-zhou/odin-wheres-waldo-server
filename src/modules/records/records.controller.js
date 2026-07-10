import { matchedData } from "express-validator";
import { prisma } from "../../lib/prisma.js";
import { BadRequestError } from "../../utils/errors.js";

export async function getAllRecords(req, res, next) {
  const query = {
    include: {
      player: true,
    },
  };

  if (req.query.sortAscend) {
    if (req.query.sortAscend !== "true") {
      return next(
        new BadRequestError(
          "Please do not provide anything other than 'true' to query 'sortAscend'. If you do not wish to ascend sort records, simply omit this query.",
        ),
      );
    }
    query.orderBy = {
      durationMs: "asc",
    };
  }

  if (req.query.n) {
    if (!req.query.sortAscend) {
      return next(
        new BadRequestError(
          "Query 'n' is meant to be used together with query 'sortAscend' to return the top n records. Please set sortAscend to true.",
        ),
      );
    }
    if (!Number.isInteger(+req.query.n) || req.query.n <= 0) {
      return next(
        new BadRequestError("Please provide a positive integer for query 'n'."),
      );
    }
    const totalRecords = await prisma.record.count();
    if (req.query.n < totalRecords) {
      query.take = +req.query.n;
    }
  }

  const records = await prisma.record.findMany(query);

  return res.json(records);
}

export async function createRecord(req, res, next) {
  const { name, durationMs } = matchedData(req);
  const player = await prisma.player.findUnique({
    where: {
      name: name,
    },
    include: {
      record: true,
    },
  });

  if (player) {
    if (durationMs < player.record.durationMs) {
      const updateRecord = await prisma.record.update({
        where: {
          id: player.record.id,
        },
        data: {
          durationMs: durationMs,
        },
      });
      return res.json(updateRecord);
    } else {
      return res.json({
        message: `Player ${player.name} did not beat their record. No update is made.`,
      });
    }
  }

  const createRecord = await prisma.record.create({
    data: {
      durationMs: durationMs,
      player: {
        create: {
          name: name,
        },
      },
    },
  });
  return res.json(createRecord);
}
