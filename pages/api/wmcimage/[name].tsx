import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, response: NextApiResponse) => {
    try {
        console.log("H!")
        const name = req.query.name as string
        const result = await fetch("https://commons.wikimedia.org/wiki/Special:Redirect/file/" + name)
        response.setHeader('Content-Type', result.headers.get('Content-Type') as string)
        response.send(Buffer.from(await result.arrayBuffer()))
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}
    