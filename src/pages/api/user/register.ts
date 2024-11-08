import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";

/**
 * Handler for user registration API.
 *
 * @param req - HTTP request object, must contain a JSON body with user data.
 * @param res - HTTP response object, used to send the response.
 * @returns Promise<void> - A Promise that resolves when the response is sent.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: boolean; statusCode: number; message: string }>
): Promise<void> {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "success" });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: 400, message: "failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method not allowed" });
  }
}
