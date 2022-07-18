import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;

  const payload = { password };
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "8h" });

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
