import { data } from "~/lib/dummy";
import { prisma } from "~/lib/prisma";

export default async function handler(req, res) {
  const testink = await prisma.participant.createMany({
    data,
  });

  res.status(200).json({ message: "OK" });
}
