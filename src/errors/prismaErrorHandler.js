import { Prisma } from "../../generated/prisma/client.js";

export const prismaErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Cannot connect to the database
    if (err.code === "ECONNREFUSED") {
      return res.status(503).json({
        error:
          "Cannot connect to the database. Have you configured one, and is it on?",
      });
    } else {
      // Throw a 400 for every other known but unhandled client request error
      return res.status(400).json({
        error: `${err.code}: ${err.message}`,
      });
    }
  }

  // Throw a 400 for every other unknown client request error
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(400).json({
      error: `${err.message}`,
    });
  }

  next(err); 
};
