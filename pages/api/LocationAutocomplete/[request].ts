
    // GENERATED FILE DO NOT EDIT

import Ajv from "ajv";
import { NextApiRequest, NextApiResponse } from "next";
import SCHEMAS from "../../../schema";
import serve from "../../../service/locationAutocomplete";

const validator = new Ajv();
const validate = validator.compile(SCHEMAS.LocationAutocomplete.request)


export default async (req: NextApiRequest, response: NextApiResponse) => {
    try {
        const request = JSON.parse(req.query.request as string)
        if (!validate(request)) {
            response.status(400).send('')
        } else {
            const data = await serve(request);
            response.status(200).json(data)
        }
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}
    