import { NextPageContext } from "next";

export const COLLEGE_RANKING_SORTS = {
  name: true,
  median_sat: true,
  undergrad_tuition_in_state: true,
  average_earnings: true,
  acceptance_rate: true,
  total_students: true,
  influence_score: true
};

export type CollegeData = {
  id: string;
  name: string;
  city: string;
  state: string;
  median_sat: number | null;
  median_act: number | null;
  undergrad_tuition_in_state: number | null;
  average_earnings: number | null;
  acceptance_rate: number | null;
  total_students: number | null;
  influence_score: number | null;
};

export type API = {
  collegeRankings: {
    request: {
      sort: keyof typeof COLLEGE_RANKING_SORTS;
      reversed: boolean
    };
    response: {
      schools: CollegeData[];
    };
  };
};

let serviceProvider: any = null;
if (!process.browser) {
  serviceProvider = import("./service");
}

export async function api<Service extends keyof API>(
  service: Service,
  request: API[Service]["request"]
) {
  if (typeof window === "undefined") {
    return (await serviceProvider).provideService(service, request);
  } else {
    const response = await fetch(
      "/api/data/" + service + "/" + encodeURIComponent(JSON.stringify(request))
    );

    return response.json();
  }
}
