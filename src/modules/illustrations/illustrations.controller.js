import { prisma } from "../../lib/prisma.js";
import _ from "lodash";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import isPositiveInteger from "../../utils/isPositiveInteger.js";

export async function getAllIllustrations(req, res, next) {
  const illustrations = await prisma.illustration.findMany().catch(next);
  return res.json(illustrations);
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
      return next(
        new BadRequestError("Please enter a positive integer for query 'n'."),
      );
    }
    // And less than number of all characters available
    if (req.query.n > characters.length) {
      return next(
        new BadRequestError(
          "Please select fewer than all characters in the map.",
        ),
      );
    }
    characters = _.sampleSize(characters, req.query.n);
  }

  return res.json(characters);
}

export async function foundCharacterInMap(req, res, next) {
  if (!req.query.x || !req.query.y) {
    return next(
      new BadRequestError(
        "Please provide both x and y coordinates as query parameters",
      ),
    );
  }

  if (req.query.x <= 0 || req.query.y <= 0) {
    return next(
      new BadRequestError(
        "Both x and y coordinates have to be positive numbers",
      ),
    );
  }

  const illustration = await prisma.illustration.findUnique({
    where: {
      id: req.params.illustrationId,
    },
    include: {
      characters: {
        where: {
          id: req.params.characterId,
        },
        select: {
          xStartPx: true,
          xEndPx: true,
          yStartPx: true,
          yEndPx: true,
        },
      },
    },
  });

  if (!illustration) {
    return next(
      new NotFoundError(
        `Cannot find illustration with id ${req.params.illustrationId}. Please check illustration id.`,
      ),
    );
  }

  if (illustration.characters.length === 0) {
    return next(
      new NotFoundError(
        `Cannot find character with id ${req.params.characterId} in illustration with id ${req.params.illustrationId}. Please check character id.`,
      ),
    );
  }

  const { widthPx, heightPx } = illustration;
  const { xStartPx, xEndPx, yStartPx, yEndPx } = illustration.characters[0];

  if (req.query.x > widthPx || req.query.y > heightPx) {
    return next(
      new BadRequestError(
        "Please choose a pair of coordinates that is within the bound of the map.",
      ),
    );
  }

  if (
    req.query.x >= xStartPx &&
    req.query.x <= xEndPx &&
    req.query.y >= yStartPx &&
    req.query.y <= yEndPx
  ) {
    return res.json({ found: true });
  } else {
    return res.json({ found: false });
  }

  return res.json(illustration);
}

export async function getIllustrationArtist(req, res, next) {
  const illustration = await prisma.illustration.findUnique({
    where: {
      id: req.params.illustrationId,
    },
    include: {
      artist: true,
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

  return res.json(illustration.artist);
}
