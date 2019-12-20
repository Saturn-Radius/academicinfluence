import { NextApiResponse, NextApiRequest } from "next";
import databasePool from "../../../databasePool"
import * as squel from "../../../squel"

export default async (req: NextApiRequest, response: NextApiResponse) => {
   try {

        const pool = await databasePool;

        const slug = req.query.slug;

            const db_response = await pool.query(
                squel.select()
                    .from("editor.images")
                    .join("editor.blobs", undefined, "images.image = blobs.id")
                    .where("editor.images.slug = ?", slug)
                    .field("data")
                    .field("type")
                    .toParam()
            );

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