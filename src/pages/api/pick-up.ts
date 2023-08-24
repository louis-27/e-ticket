import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, curValue } = req.body;

  const pickedUp = await prisma.participant.update({
    where: { id },
    data: {
      pickedUp: !curValue,
    }
  });
  console.log('res', pickedUp)

  res.status(200).json({ message: "OK", body: pickedUp });
}
