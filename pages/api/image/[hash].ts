import { NextApiResponse, NextApiRequest } from "next";
import databasePool from "../../../databasePool"

export default async (req: NextApiRequest, response: NextApiResponse) => {
   try {

        const pool = await databasePool;

        const hash = req.query.hash;

            const db_response = await pool.query({
                text: "SELECT data, type FROM editor.BLOBS WHERE ID = $1",
                values: [hash]
            });

            if (db_response.rows.length == 0) {
                response.status(404)
                response.send("");
            } else {
                const row = db_response.rows[0];
                response.setHeader("content-type", row.type);
                response.status(200);
                response.send(row.data);
            }
        } catch (error) {
            console.error(error);
            response.status(500)
            response.send("");
        }

}