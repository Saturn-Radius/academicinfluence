import { NextApiResponse, NextApiRequest } from "next";

export default (req: NextApiRequest, response: NextApiResponse) => {
    response.status(200).json({
        "hello": "world"
    })
}