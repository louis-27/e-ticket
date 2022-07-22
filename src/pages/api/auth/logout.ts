import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("E-TICKET_ACCESS_TOKEN", "", {
      path: "/",
      expires: "",
    })
  );

  res.status(200).json({ message: "OK" });
}
