import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Define the User schema
const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters",
  }),
});

// Handler function
export default function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = UserSchema.parse(req.body);
    return res.status(200).json(userData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
