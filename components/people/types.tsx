import { InfluentialPeoplePageRequest } from "../../schema";

export type FilterProps = {
  request: InfluentialPeoplePageRequest;
  updateRequest: (request: InfluentialPeoplePageRequest) => void;
};
