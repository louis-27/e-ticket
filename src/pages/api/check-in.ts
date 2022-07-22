import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

// /check-in
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, checkInId } = req.body;

  if (!checkInId) {
    const createCheckIn = await prisma.checkIn.create({
      data: {
        Participant: {
          connect: {
            id,
          },
        },
      },
    });
  } else {
    const deleteCheckIn = await prisma.checkIn.delete({
      where: {
        id: checkInId,
      },
    });
  }

  res.status(200).json({ message: "OK" });
}
