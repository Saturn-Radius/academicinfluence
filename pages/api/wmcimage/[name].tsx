import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";


export default async function serve(req: NextApiRequest, response: NextApiResponse) {
    try {
        const name = req.query.name as string
        const result = await fetch("https://commons.wikimedia.org/wiki/Special:Redirect/file/" + name)
        if (result.status == 200) {
            response.setHeader('Content-Type', result.headers.get('Content-Type') as string)
            response.setHeader('Cache-Control', 'public, max-age=86400')
            response.send(Buffer.from(await result.arrayBuffer()))
        } else if (result.status == 429) {
            setTimeout(() => {
                serve(req, response)
            }, 10*1000)
        } else {
            console.log(result.status)
            response.status(500)
        }
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}
    