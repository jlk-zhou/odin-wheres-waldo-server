import { prisma } from "../../lib/prisma.js";
import _ from "lodash";

export async function getAllIllustrations(req, res) {
  const illustrations = await prisma.illustration.findMany();
  return res.send(illustrations);
}

export async function getIllustrationCharacters(req, res) {
  const illustration = await prisma.illustration.findUnique({
    where: {
      id: req.params.illustrationId,
    },
    include: {
      characters: true,
    },
  });
  
  let characters = illustration.characters;
  if (req.query.n) {
    characters = _.sampleSize(characters, req.query.n);
  }

  return res.send(characters);
}
