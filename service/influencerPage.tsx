import { Dictionary } from "lodash";
import { InfluencerDisciplineInfluenceData, InfluencerPageRequest, InfluencerPageResponse } from "../api";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import * as squel from "../squel";

export default async function serveInfluencerPage(request: InfluencerPageRequest): Promise<InfluencerPageResponse> {

    const pool = await databasePool;

    const influencerQuery = pool.query(squel.select().from("editor.ai_influencers")
        .join("ai_data.influencers", undefined, "ai_data.influencers.id = editor.ai_influencers.id")
        .where("ai_influencers.slug = ?", request.slug)
        .field("influencers.name")
        .field("coalesce(nullif(ai_influencers.description, ''), influencers.description)", "description")
        .toString())

    const influenceQuery = pool.query(influenceScoreQuery(1900, 2020)
        .join("editor.ai_influencers", undefined, "editor.ai_influencers.id = scores.id")
        .where("editor.ai_influencers.slug = ?", request.slug)
        .left_join("editor.ai_disciplines", undefined, "ai_disciplines.id = scores.keyword")
        .field("ai_disciplines.name")
        .field("scores.keyword")
        .field("world_rank")
        .field("usa_rank")
        .order("influence", false)
        .where("scores.keyword is null or ai_disciplines.name is not null")
        .toParam())

    const influencer = (await influencerQuery).rows[0]

    const influences: Dictionary<InfluencerDisciplineInfluenceData> = {}
    for (const row of (await influenceQuery).rows) {
        influences[row.name || ""] = {
            influence: row.influence,
            world_rank: row.world_rank,
            usa_rank: row.usa_rank
        }
    }
    return {
        influencer: {
            ...influencer,
            disciplines: influences
            
        }
   }
}