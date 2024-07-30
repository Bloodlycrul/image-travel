import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextResponse> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID!,
    process.env.GOOGLE_SECRET!,
    "http://localhost:3000/api/auth/callback/google"
  );

  const scopes = [
    "https://www.googleapis.com/auth/photoslibrary.readonly",
    "https://www.googleapis.com/auth/photoslibrary.sharing",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  console.log(url);

  return NextResponse.json({ url });
}
