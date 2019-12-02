import {API} from "../api"

import {serveCollegeRankings} from "./collegeRankings"

export function provideService<Service extends keyof API>(service: Service, request: API[Service]['request']): Promise<API[Service]['response']> {
    switch (service){
        case "collegeRankings":
            return serveCollegeRankings(request)
        default:
            throw new Error()
    }

}