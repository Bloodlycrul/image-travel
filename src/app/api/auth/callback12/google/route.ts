import { google, oauth2_v2 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

type Tokens = oauth2_v2.Schema$Tokeninfo;

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean | undefined> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID!,
    process.env.GOOGLE_SECRET!,
    "http://localhost:3000/api/auth/callback/google"
  );

  const code = req.url;
  console.log("I am code", code);
  if (!code) {
    res.status(400).send("Authorization code is required");
    return false;
  }

  if (code) {
    const urlObj = new URL(code);
    const finalCode = urlObj.searchParams.get("code");

    console.log("Final Code", finalCode);

    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log(tokens);
      localStorage.setItems("google_oAuth2_token", tokens);
      res.json(tokens);
      return true;
    } catch (error) {
      console.error("Error retrieving access token", error);
      res.json(error);
      return false;
    }
  }
}
