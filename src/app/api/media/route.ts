import { NextApiRequest, NextApiResponse } from "next";

import cache from "memory-cache";
import { NextResponse } from "next/server";

const fetchMediaItems = async (accessToken: string) => {
  const response = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("failed to fetch media items");
  }

  const data = await response.json();
  return data.mediaItems || [];
};

export async function GET(req: NextApiRequest, res: NextResponse) {
  const cacheKey = "mediaItems";
  const cachedMediaItems = cache.get(cacheKey);
  console.log("I am cached Value", cachedMediaItems);

  if (cachedMediaItems) {
    return NextResponse.json(cachedMediaItems);
  }

  const accessToken =
    "ya29.a0AXooCguO1NkDNqjFoSboD6RrQ14G27QuEn6p127ts4LzqqXQP5rnWFk7lenKiE-nJG3YcAUSKjNoSmXakC4n1OuLRdlMMpuh2su3h50j9Vc71NCko7m4M5dYdwaVJIrT-I7njYp1KqG3Nrvih6PC2WHQkYcdmU3exuPIaCgYKAVQSAQ4SFQHGX2MijcqfOOKd56jtF1-J4Fadfw0171";

  try {
    const mediaItems = await fetchMediaItems(accessToken);
    console.log("I am media", mediaItems);
    cache.put(cacheKey, mediaItems, 3600 * 1000);
    return NextResponse.json(mediaItems);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
