import { prisma } from "../../lib/prisma.js";
import _ from "lodash";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";

export async function getAllIllustrations(req, res, next) {
  const illustrations = await prisma.illustration.findMany().catch(next);
  return res.send(illustrations);
}

export async function getIllustrationCharacters(req, res, next) {
  const illustration = await prisma.illustration.findUnique({
    where: {
      id: req.params.illustrationId,
    },
    include: {
      characters: true,
    },
  });

  // Throw an error if there's no such illustration
  if (!illustration) {
    return next(
      new NotFoundError(
        `Cannot find illustration with id '${req.params.illustrationId}'`,
      ),
    );
  }

  let characters = illustration.characters;

  // If a query is provided to choose n characters
  if (req.query.n) {
    // Query has to be a positive integer
    if (!Number.isInteger(+req.query.n) || req.query.n < 0) {
      return next(new BadRequestError("Please enter a positive integer for query 'n'."));
    }
    // And less than number of all characters available
    if (req.query.n > characters.length) {
      return next(new BadRequestError("Please select fewer than all characters in the map."))
    }
    characters = _.sampleSize(characters, req.query.n);
  }

  return res.send(characters);
}
