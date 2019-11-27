import { NextApiResponse, NextApiRequest } from "next";
import * as squel from "../../squel"

export default (req: NextApiRequest, response: NextApiResponse) => {
    response.status(200).json({
        "hello": "world"
    })
}