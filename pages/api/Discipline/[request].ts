// GENERATED FILE DO NOT EDIT

import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "../../../api";
import serve from "../../../service/discipline";

export default async (req: NextApiRequest, response: NextApiResponse) => {
  try {
    const request = JSON.parse(req.query.request as string);
    if (!validate("DisciplineRequest", request)) {
      response.status(400).send("");
    } else {
      const data = await serve(request);
      if (data === null) {
        response.status(404);
      } else {
        response.status(200).json(data);
      }
    }
  } catch (error) {
    console.error(error);
    response.status(500);
  }
};
