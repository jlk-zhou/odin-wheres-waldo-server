import { prisma } from "../../lib/prisma.js";

export async function getAllMessages(req, res) {
  const message = await prisma.message.findMany();
  return res.send(message);
}

export async function getMessage(req, res) {
  const message = await prisma.message.findUnique({
    where: { id: req.params.messageId },
  });
  return res.send(message); 
}
