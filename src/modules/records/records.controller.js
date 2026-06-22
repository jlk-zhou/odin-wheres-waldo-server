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
        new BadRequestError("Query 'n' is meant to be used together with query 'sortAscend' to return the top n records. Please set sortAscend to true.")
      )
    }
    if (!Number.isInteger(+req.query.n) || req.query.n <= 0) {
      return next(
        new BadRequestError("Please provide a positive integer for query 'n'."),
      );
    }
    const totalRecords = await prisma.record.count();
    if (req.query.n > totalRecords) {
      return next(
        new BadRequestError("Please select fewer records than there are."),
      );
    }
    query.take = +req.query.n;
  }

  const records = await prisma.record.findMany(query);

  return res.json(records);
}
