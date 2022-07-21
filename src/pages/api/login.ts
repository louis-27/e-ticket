import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { sign } from "~/lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password } = req.body;

  if (password !== process.env.PASSWORD) {
    res.status(401);
    res.json({ message: "Incorrect credentials" });

    return;
  }

  const payload = { password };
  const secret = process.env.SECRET;
  const token = await sign(payload, secret);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("E-TICKET_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 3600,
      path: "/",
      sameSite: "lax",
    })
  );

  res.status(200).json({ message: "OK" });
}
