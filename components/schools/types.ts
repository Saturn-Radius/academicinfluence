import { InfluentialSchoolsPageRequest } from "../../schema";

export type FilterProps = {
  request: InfluentialSchoolsPageRequest;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
};
