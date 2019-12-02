import { NextApiRequest, NextApiResponse } from "next";
import { provideService } from "../../../../service";

export default async (req: NextApiRequest, response: NextApiResponse) => {
    try {
        const service= req.query.service;
        const request = JSON.parse(req.query.request as string)
        const data = await provideService(service as any, request);
        response.status(200).json(data)
    } catch (error) {
        console.error(error)
        response.status(500)
    }
}