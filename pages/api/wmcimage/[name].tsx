import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
const { crop } = require("smartcrop-sharp");

export default async function serve(
  req: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const name = req.query.name as string;
    const result = await fetch(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + name
    );
    if (result.status == 200) {
      response.setHeader(
        "Content-Type",
        result.headers.get("Content-Type") as string
      );
      const data = await result.arrayBuffer();
      const image = sharp(Buffer.from(data));
      const metadata = await image.metadata();
      const size = Math.min(
        metadata.width as number,
        metadata.height as number
      );
      const shape = await crop(Buffer.from(data), {
        width: size,
        height: size
      });
      console.log(shape);
      const resized = image
        .extract({
          width: size,
          height: size,
          left: shape.topCrop.x,
          top: shape.topCrop.y
        })
        .resize(140, 140)
        .toBuffer();
      response.setHeader("Cache-Control", "public, max-age=86400");
      response.send(await resized);
    } else if (result.status == 429) {
      setTimeout(() => {
        serve(req, response);
      }, 10 * 1000);
    } else {
      console.log(result.status);
      response.status(500);
    }
  } catch (error) {
    console.error(error);
    response.status(500);
  }
}
