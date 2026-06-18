import { prisma } from "../../lib/prisma.js";

export async function getAllUsers(req, res) {
  const user = await prisma.user.findMany();
  return res.send(user);
}

export async function getUser(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.params.userId },
  });
  return res.send(user); 
}
