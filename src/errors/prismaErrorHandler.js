import { Prisma } from "../../generated/prisma/client.js";

export const prismaErrorHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "ECONNREFUSED") {
      res.status(503).json({
        error:
          "Cannot connect to the database. Have you configured one, and is it on?",
      });
    }

    // Throw a 400 for every other unknown client request error
    res.status(400).json({
      error: `${err.message}`,
    });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(400).json({
      error: `${err.message}`,
    });
  }
};
