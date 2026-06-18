import { prisma } from "../../lib/prisma.js";

export async function getAllIllustrations(req, res) {
  const illustrations = await prisma.illustration.findMany();
  return res.send(illustrations);
}
